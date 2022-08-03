import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
    static async getInitialProps(ctx) {
        const initialProps = await Document.getInitialProps(ctx)
        return { ...initialProps }
    }

    render() {
        return (
            <Html>
                <title>รพ.ศรีสังวรสุโขทัย</title>
                <Head>
                    <div>

                        <link rel="shortcut icon" href="/static/favicon.ico" />
                        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/css/bootstrap.min.css"
                            integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm"/>

                        <link href='https://fonts.googleapis.com/css?family=Kanit:400,300&subset=thai,latin' rel='stylesheet'
                            type='text/css' />

                        <title>ssw | Queue</title>
                    </div>


                </Head>
                <body style={{ fontFamily: 'Kanit',backgroundColor : '#ECECEC' }}>
                    <Main />
                    <NextScript />







                </body>
            </Html>
        )
    }
}

export default MyDocument