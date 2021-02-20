use flatgeobuf::*;
use geozero::error::Result;
use geozero::svg::SvgWriter;
use geozero::wkt::WktWriter;
use std::fs::File;
use std::io::{BufReader, Write};

fn invert_y(header: &Header) -> bool {
    if let Some(crs) = header.crs() {
        if crs.code() == 4326 {
            return true;
        }
    }
    false
}

fn svg_writer<'a, W: Write>(
    header: &Header,
    width: u32,
    height: u32,
    out: &'a mut W,
) -> SvgWriter<'a, W> {
    let mut svg = SvgWriter::new(out, invert_y(header));
    if let Some(envelope) = header.envelope() {
        svg.set_dimensions(
            envelope.get(0),
            envelope.get(1),
            envelope.get(2),
            envelope.get(3),
            width,
            height,
        );
    }
    svg
}

trait GeomToSvg {
    fn to_svg<'a, W: Write>(
        &self,
        out: &'a mut W,
        geometry_type: GeometryType,
        invert_y: bool,
    ) -> Result<()>;
}

impl GeomToSvg for Geometry<'_> {
    fn to_svg<'a, W: Write>(
        &self,
        out: &'a mut W,
        geometry_type: GeometryType,
        invert_y: bool,
    ) -> Result<()> {
        let mut svg = SvgWriter::new(out, invert_y);
        self.process(&mut svg, geometry_type)
    }
}

trait FeatureToSvg {
    fn to_svg<'a, W: Write>(
        &self,
        out: &'a mut W,
        geometry_type: GeometryType,
        invert_y: bool,
    ) -> Result<()>;
}

impl FeatureToSvg for Feature<'_> {
    /// Convert feature to SVG
    fn to_svg<'a, W: Write>(
        &self,
        out: &'a mut W,
        geometry_type: GeometryType,
        invert_y: bool,
    ) -> Result<()> {
        let mut svg = SvgWriter::new(out, invert_y);
        let geometry = self.geometry().unwrap();
        geometry.process(&mut svg, geometry_type)
    }
}

fn feature_from_u8<'a>(buf: &'a [u8], loc: usize) -> Feature<'a> {
    Feature::init_from_table(flatbuffers::Table::new(buf, loc))
}

#[allow(dead_code)]
fn debug_geom_reader(geometry: &Geometry, geometry_type: GeometryType) {
    geometry
        .process(&mut WktWriter::new(&mut std::io::stdout()), geometry_type)
        .unwrap();
}

#[test]
fn fgb_to_svg() -> Result<()> {
    let mut filein = BufReader::new(File::open("../../test/data/countries.fgb")?);
    let mut fgb = FgbReader::open(&mut filein)?;

    // countries.fgb, id = ZAF
    let fbuf = hex::decode("100000000000000008000c0004000800080000003c000000040000001b0000000000030000005a414601000c000000536f757468204166726963610014000c0000000000000000000000000007000800140000000000000604000000010000001800000000001200100008000c00000000000000000007001200000000000003f005000004000000bc000000ec2e505260853f40626a4b1de4413dc062da37f757533f4024b6bb07e8663dc02bbea1f0d9e63e402ac423f1f2e83dc00e863aac709f3e4067d47c957c6c3ec02bdd5d67430e3e4083a44fabe8233fc0f6b6990af1ec3c401b498270051640c08b19e1ed41383c4049861c5bcf6240c0c075c58cf0763b4047af06280d9d40c0e63dce34616b3a406d567daeb6ce40c03a596abddfe83940da8f149161d540c08657923cd7c739400b26fe28eaf840c09db81caf402c39407764ac36ffe540c0d87e32c687ad3840b3b27dc85bfe40c0f06ab93313983740dbc2f352b1e540c056444df4f9fc364032056b9c4df540c0fcc401f4fb923640c90391459aee40c02f4d11e0f48a3540f5f6e7a2212141c0f03504c765b03440bada8afd653541c0f27a30293e123440766b990cc76541c04417d4b7cc9d334061ff756eda6841c04a09c1aa7a313340c614ac71363b41c03bc780ecf5da324052b5dd04df3841c0af795567b56c3240dc476e4dbaff40c09126de019e603240ce1b2785791141c09be7887c973e3240f1845e7f12ef40c039622d3e05403240508a56ee05a440c014967840d9ec314069ab92c83e4e40c0f3599e07773f32409259bdc3ed3640c0dc7ef964c538324051f4c0c760a93fc08483bd89219131403a05f9d9c8b93ec0d25625917d103140bbecd79deee03dc06954e0641b103140e6cc76853ee03dc048dfa469505830408f705af0a2933cc0195932c7f2d2304055f99e9108153cc05f251fbb0b383140793d98141f5b3cc0514cde003363314049f59d5f94c83cc0287cb60e0ed631408e03af963bdb3cc06ff1f09e03773240f435cb65a30b3dc0487023658b00334060394206f2f83cc0889e94490de53340a7052ffa0a763cc0a7cd380d51e533402332ace28dc438c0ce18e6046d2a344083f8c08effea38c086730d3334c23440f27a30293ede39c0dfc325c79daa344089601c5c3a7a3ac02e3a596abde334406954e0641bd43ac0f8c610001c9b35409c6ed921feb93ac0cc63cdc8201b3640fe8172dbbe473ac048fc8a355c943640f321a81abdfa39c08d0a9c6c03d3364026fdbd141e8039c0022ec896e54f374022c32adec84439c0a453573ecbbb3740a038807edf6339c05ab91798153638408541994693ab39c0c0ce4d9b710639408ee9094b3cb839c05dc30c8d27aa3940672b2ff99f7c39c09fac18ae0ec439407fde54a4c22c39c08736001b10f1394042d13c8045b238c013ef004f5a7c3a404ca4349bc79d38c071581af851c93a400971e5ec9d3d38c0bbd05ca7911e3b40325706d5069337c05950189469043c401822a7afe7d336c041b96ddfa36e3d401cb3ec49601736c04b22fb20cbd63d40c020e9d32a1a36c0336fd575a8523e407f33315d884536c069c6a2e9eca83e4020274c18cd2636c0fa28232e00313f40f19d98f5624036c0c64d0d349fab3f40ec134031b2a837c07104a9143bee3f402096cd1c925e38c0af3f89cf9dc03f40dff94509fa7b39c0ec4e779e78d63f4097ab1f9be4d739c09966bad749553f40111d024702a939c05e68aed3480b3f400398327040bb39c0271763601df33e4080492a53cc053ac0e42d573f36ad3e40d1419770e8653ac07b4ca4349baf3e400a4b3ca06cbe3ac01a31b3cf63483f40fa9cbb5d2f493bc03cf71e2e39de3f404d13b69f8c2d3bc049a297512c0940409626a5a0dbbb3ac0b5e0455f416a4040535a7f4b00be3ac0b8019f1f464a4040e9f351465c783bc081b3942c273b40407bbc900e0f4d3cc0deae97a6081a4040cd58349d9dc03cc0ec2e505260853f40626a4b1de4413dc008e3a7716ffa3c40dd274701a2f43cc0423ee8d9ac8a3c403718eab0c2a53cc09dd9aed007133c40ce8e54dff9d93cc0a0c211a452883b402461df4e223e3dc0b4226aa2cfff3a40e6cc76853ee03dc073b8567bd8bf3b401074b4aa25a53ec0baf770c9711b3c407461a417b58b3ec022e17b7f834a3c409acc785be9393ec029ed0dbe30d93c40560dc2dcee113ec07fc16ed8b6043d4072e0d57267be3dc069c537143e533d40626a4b1de4413dc008e3a7716ffa3c40dd274701a2f43cc00000000002000000520000005e000000").unwrap();
    let feature = feature_from_u8(&fbuf, 16);
    let mut svg_data: Vec<u8> = Vec::new();
    feature.to_svg(&mut svg_data, GeometryType::MultiPolygon, true)?;
    assert_eq!(
        std::str::from_utf8(&svg_data).unwrap(),
        r#"<path d="M 31.521001 29.257387 31.325561 29.401978 30.901763 29.909957 30.622813 30.423776 30.055716 31.140269 28.925553 32.172041 28.219756 32.771953 27.464608 33.226964 26.419452 33.61495 25.909664 33.66704 25.780628 33.944646 25.172862 33.796851 24.677853 33.987176 23.594043 33.794474 22.988189 33.916431 22.574157 33.864083 21.542799 34.258839 20.689053 34.417175 20.071261 34.795137 19.616405 34.819166 19.193278 34.462599 18.855315 34.444306 18.424643 33.997873 18.377411 34.136521 18.244499 33.867752 18.25008 33.281431 17.92519 32.611291 18.24791 32.429131 18.221762 31.661633 17.566918 30.725721 17.064416 29.878641 17.062918 29.875954 16.344977 28.576705 16.824017 28.082162 17.218929 28.355943 17.387497 28.783514 17.836152 28.856378 18.464899 29.045462 19.002127 28.972443 19.894734 28.461105 19.895768 24.76779 20.165726 24.917962 20.758609 25.868136 20.66647 26.477453 20.889609 26.828543 21.605896 26.726534 22.105969 26.280256 22.579532 25.979448 22.824271 25.500459 23.312097 25.26869 23.73357 25.390129 24.211267 25.670216 25.025171 25.71967 25.664666 25.486816 25.765849 25.174845 25.941652 24.696373 26.485753 24.616327 26.786407 24.240691 27.11941 23.574323 28.017236 22.827754 29.432188 22.091313 29.839037 22.102216 30.322883 22.271612 30.659865 22.151567 31.191409 22.25151 31.670398 23.658969 31.930589 24.369417 31.752408 25.484284 31.837778 25.843332 31.333158 25.660191 31.04408 25.731452 30.949667 26.022649 30.676609 26.398078 30.685962 26.743845 31.282773 27.285879 31.86806 27.177927 32.071665 26.73382 32.83012 26.742192 32.580265 27.470158 32.462133 28.301011 32.203389 28.752405 31.521001 29.257387 Z M 28.978263 28.955597 28.5417 28.647502 28.074338 28.851469 27.532511 29.242711 26.999262 29.875954 27.749397 30.645106 28.107205 30.545732 28.291069 30.226217 28.8484 30.070051 29.018415 29.743766 29.325166 29.257387 28.978263 28.955597 Z "/>"#
    );

    let _count = fgb.select_bbox(8.8, 47.2, 9.5, 55.3)?;
    let mut svg_data: Vec<u8> = Vec::new();
    let mut svg = svg_writer(&fgb.header(), 800, 400, &mut svg_data);
    fgb.process_features(&mut svg)?;
    let out = std::str::from_utf8(&svg_data).unwrap();
    let expected = r#"<?xml version="1.0"?>
<svg xmlns="http://www.w3.org/2000/svg" version="1.2" baseProfile="tiny" width="800" height="400" viewBox="-180 -83.64513 360 169.254168" stroke-linecap="round" stroke-linejoin="round">
<g id="countries">
<path d="M 12.690006 -55.609991 12.089991 -54.800015 11.043543 -55.364864 10.903914 -55.779955 12.370904 -56.111407 12.690006 -55.609991 Z "/><path d="M 10.912182 -56.458621 10.667804 -56.081383 10.369993 -56.190007 9.649985 -55.469999 9.921906 -54.983104 9.282049 -54.830865 8.526229 -54.962744 8.120311 -55.517723 8.089977 -56.540012 8.256582 -56.809969 8.543438 -57.110003 9.424469 -57.172066 9.775559 -57.447941 10.580006 -57.730017 10.546106 -57.215733 10.25 -56.890016 10.369993 -56.609982 10.912182 -56.458621 Z "/>
<path d="M 16.979667 -48.123497 16.903754 -47.714866 16.340584 -47.712902 16.534268 -47.496171 16.202298 -46.852386 16.011664 -46.683611 15.137092 -46.658703 14.632472 -46.431817 13.806475 -46.509306 12.376485 -46.767559 12.153088 -47.115393 11.164828 -46.941579 11.048556 -46.751359 10.442701 -46.893546 9.932448 -46.920728 9.47997 -47.10281 9.632932 -47.347601 9.594226 -47.525058 9.896068 -47.580197 10.402084 -47.302488 10.544504 -47.566399 11.426414 -47.523766 12.141357 -47.703083 12.62076 -47.672388 12.932627 -47.467646 13.025851 -47.637584 12.884103 -48.289146 13.243357 -48.416115 13.595946 -48.877172 14.338898 -48.555305 14.901447 -48.964402 15.253416 -49.039074 16.029647 -48.733899 16.499283 -48.785808 16.960288 -48.596982 16.879983 -48.470013 16.979667 -48.123497 Z "/>
"#;
    assert_eq!(&out[..expected.len()], expected);
    let expected = r#"99.93976 -78.88094 Z "/>
</g>
</svg>"#;
    assert_eq!(&out[svg_data.len() - expected.len()..], expected);

    Ok(())
}

#[cfg(feature = "http")]
async fn http_svg_async() -> Result<()> {
    let url = "https://github.com/flatgeobuf/flatgeobuf/raw/master/test/data/countries.fgb";
    let mut fgb = HttpFgbReader::open(url).await?;
    fgb.select_bbox(8.8, 47.2, 9.5, 55.3).await?;

    let mut svg_data: Vec<u8> = Vec::new();
    let mut svg = svg_writer(&fgb.header(), 800, 400, &mut svg_data);
    fgb.process_features(&mut svg).await?;
    let out = std::str::from_utf8(&svg_data).unwrap();
    let expected = r#"<?xml version="1.0"?>
<svg xmlns="http://www.w3.org/2000/svg" version="1.2" baseProfile="tiny" width="800" height="400" viewBox="-180 -83.64513 360 169.254168" stroke-linecap="round" stroke-linejoin="round">
<g id="countries">
<path d="M 12.690006 -55.609991 12.089991 -54.800015 11.043543 -55.364864 10.903914 -55.779955 12.370904 -56.111407 12.690006 -55.609991 Z "/><path d="M 10.912182 -56.458621 10.667804 -56.081383 10.369993 -56.190007 9.649985 -55.469999 9.921906 -54.983104 9.282049 -54.830865 8.526229 -54.962744 8.120311 -55.517723 8.089977 -56.540012 8.256582 -56.809969 8.543438 -57.110003 9.424469 -57.172066 9.775559 -57.447941 10.580006 -57.730017 10.546106 -57.215733 10.25 -56.890016 10.369993 -56.609982 10.912182 -56.458621 Z "/>
<path d="M 16.979667 -48.123497 16.903754 -47.714866 16.340584 -47.712902 16.534268 -47.496171 16.202298 -46.852386 16.011664 -46.683611 15.137092 -46.658703 14.632472 -46.431817 13.806475 -46.509306 12.376485 -46.767559 12.153088 -47.115393 11.164828 -46.941579 11.048556 -46.751359 10.442701 -46.893546 9.932448 -46.920728 9.47997 -47.10281 9.632932 -47.347601 9.594226 -47.525058 9.896068 -47.580197 10.402084 -47.302488 10.544504 -47.566399 11.426414 -47.523766 12.141357 -47.703083 12.62076 -47.672388 12.932627 -47.467646 13.025851 -47.637584 12.884103 -48.289146 13.243357 -48.416115 13.595946 -48.877172 14.338898 -48.555305 14.901447 -48.964402 15.253416 -49.039074 16.029647 -48.733899 16.499283 -48.785808 16.960288 -48.596982 16.879983 -48.470013 16.979667 -48.123497 Z "/>
"#;
    assert_eq!(&out[..expected.len()], expected);
    Ok(())
}

#[test]
#[cfg(feature = "http")]
fn http_svg() {
    assert!(tokio::runtime::Runtime::new()
        .unwrap()
        .block_on(http_svg_async())
        .is_ok());
}
