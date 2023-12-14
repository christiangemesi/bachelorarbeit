<!doctype html>
<html lang="de">

<head>
    <meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
    <title>Passwort zurücksetzung</title>
    <meta name="description" content="Passwort zurücksetzung">
    <style type="text/css">
        @import url('https://fonts.googleapis.com/css?family=Rubik:300,400,500,700|Open+Sans:300,400,600,700');
        a:hover {text-decoration: underline !important;}
    </style>
</head>

<body marginheight="0" topmargin="0" marginwidth="0" style="margin: 0; background-color: #f2f3f8;" leftmargin="0">
<!--100% body table-->
<table cellspacing="0" border="0" cellpadding="0" width="100%" bgcolor="#f2f3f8"
       style="font-family: 'Open Sans', sans-serif;">
    <tr>
        <td>
            <table style="background-color: #f2f3f8; max-width:670px;  margin:0 auto;" width="100%" border="0"
                   align="center" cellpadding="0" cellspacing="0">
                <tr>
                    <td style="height:80px;">&nbsp;</td>
                </tr>
                <tr>
                    <td style="text-align:center;">
                        <a href="https://www.fhnw.ch/de/die-fhnw/bibliotheken/bibliothek-brugg-windisch/themenkisten/user" title="logo" target="_blank">
                            <img src="../../../public/images/fhnw_logo_w_claim_de.svg" alt="FHNW Logo">
                        </a>
                    </td>
                </tr>
                <tr>
                    <td style="height:20px;">&nbsp;</td>
                </tr>
                <tr>
                    <td>
                        <table width="95%" border="0" align="center" cellpadding="0" cellspacing="0"
                               style="max-width:670px;background:#fff; border-radius:3px; text-align:center;-webkit-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);-moz-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);box-shadow:0 6px 18px 0 rgba(0,0,0,.06);">
                            <tr>
                                <td style="height:40px;">&nbsp;</td>
                            </tr>
                            <tr>
                                <td style="padding:0 35px;">
                                    <h1 style="color:#1e1e2d; font-weight:500; margin:0;font-size:32px;font-family:'Rubik',sans-serif;">Sie haben eine Anfrage zum Zurücksetzen Ihres Passworts gestellt</h1>
                                    <span
                                            style="display:inline-block; vertical-align:middle; margin:29px 0 26px; border-bottom:2px solid #fde70e; width:100px;"></span>
                                    <p style="color:#455056; font-size:15px;line-height:24px; margin:0;">
                                        Wir können Ihnen nicht einfach Ihr altes Passwort zusenden. Es wurde ein Link zum Zurücksetzen Ihres Passworts für Sie generiert, welcher 15 Minuten gültig ist. Um Ihr Passwort zurückzusetzen, klicken Sie auf den folgenden Link und befolgen Sie die Anweisungen.
                                    </p>
                                    <a href="{{ url('admin/resetPasswordForm',$token)  }}"
                                       style="background:#fde70e;text-decoration:none !important; font-weight:500; margin-top:35px; color:#fff;text-transform:uppercase; font-size:14px;padding:10px 24px;display:inline-block;border-radius:50px;">Passwort zurücksetzen</a>
                                </td>
                            </tr>
                            <tr>
                                <td style="height:40px;">&nbsp;</td>
                            </tr>
                        </table>
                    </td>
                <tr>
                    <td style="height:20px;">&nbsp;</td>
                </tr>
                <tr>
                    <td style="text-align:center;">
                        <p style="font-size:14px; color:rgba(69, 80, 86, 0.7411764705882353); line-height:18px; margin:0 0 0;">&copy; <strong>https://www.fhnw.ch/</strong></p>
                    </td>
                </tr>
                <tr>
                    <td style="height:80px;">&nbsp;</td>
                </tr>
            </table>
        </td>
    </tr>
</table>
<!--/100% body table-->
</body>

</html>
