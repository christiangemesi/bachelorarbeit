<style>
    p {
        font-size: 16px;
        line-height: 22px;
    }
</style>

<p>Guten Tag</p>

<p>Besten Dank für die Bestellung folgender Themenkiste</p>

<p><b>Titel:</b> {{ $title }} </p>
<p><b>Signatur:</b> {{ $signatur }} </p>

<p>
    Wir bitten Sie, diese am <b>{{ $startdate }} </b>abzuholen.
    Falls Sie die Kiste nicht am vereinbarten Termin abholen können, wird die Kiste zurück ins Regal gestellt und steht dann den anderen Benutzenden wieder zur Verfügung.
    <br><br>
    Ihre Bestellung können Sie unter <a href="http://http://server1121.cs.technik.fhnw.ch/user/loginForm">Bestellverwaltung</a> mit den folgenden Daten bearbeiten:
    <br>

    Nachname Bestellperson:  <b>{{ $receiver_name }}</b><br>
    Bestellnummer: <b>{{ $ordernumber }}</b><br>
</p>

<p>
    Vielen Dank und freundliche Grüsse<br>
    Ihr Team der Campusbibliothek Brugg-Windisch
</p>
