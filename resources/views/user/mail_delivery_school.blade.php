<style>
    p {
        font-size: 16px;
        line-height: 22px;
    }
</style>

<p>Guten Tag</p>

<p>Besten Dank für die Bestellung folgender Themenkiste mit <b>Lieferung an Ihre Schule</b>:<br></p>

<p><b>Titel:</b> {{ $title }} </p>
<p><b>Signatur:</b> {{ $signatur }} </p>

<p>
    Die Themenkiste wird am <b> {{ $startdate }} </b> an Ihre Schule geliefert.</br>
    Bitte stellen Sie die Themenkiste am Montagmorgen, <b>{{ $pickupdate }} </b> wieder zum Abholen bereit. Sie wird in dieser Woche bis spätestens Donnerstag abgeholt.</br>
    Für den Versand der Themenkiste werden Ihrem NEBIS-Konto Gebühren von <b>Fr. 50.- </b> belastet. Die Rechnung erhalten Sie im folgenden Monat von der NEBIS-Gebührenverwaltung.
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
