import Typography from "antd/es/typography/Typography";

function Footer() {
    return ( <div className="footer">
        <Typography.Link href="https://www.youtube.com/watch?v=maTYhCuHEGw&ab_channel=CodeWithAamir" target={'_blank'}>Privacy Policy</Typography.Link>
        <Typography.Link href="https://www.youtube.com/watch?v=maTYhCuHEGw&ab_channel=CodeWithAamir" target={'_blank'}>Terms & Conditions</Typography.Link>
        <Typography.Link href="https://www.youtube.com/watch?v=maTYhCuHEGw&ab_channel=CodeWithAamir" target={'_blank'}>Return Policy</Typography.Link>
        <Typography.Link href="tel:+84911397764" target={'_blank'}>+84911397764</Typography.Link>
    </div> );
}

export default Footer;