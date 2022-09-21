import Document, {Head, Main, NextScript} from "next/document";

export default function Documnet() {
    return(
        <html>
            <Head>
                <title> Nextjs Awesome </title>
            </Head>
            <body>
                <Main />
                <NextScript />
            </body>
        </html>
    )
}