<style>
    p {
        font-size: 16px;
        line-height: 22px;
    }
</style>

<p>Guten Tag</p>

<p>Gerne informieren wir Sie, dass die für Sie reservierte Themenkiste zur Abholung bereit steht.</p>

<p><b>Titel:</b> {{ $title }} </p>
<p><b>Signatur:</b> {{ $signatur }} </p>

<p>
    Bitte beachten Sie unsere aktuellen Öffnungszeiten.
</p>

<p>
    Ihre Bestellung können Sie unter <a href="http://http://server1121.cs.technik.fhnw.ch/user/loginForm">Bestellverwaltung</a> mit den folgenden Daten ansehen:
    <br>

    Nachname Bestellperson:  <b>{{ $receiver_name }}</b><br>
    Bestellnummer: <b>{{ $ordernumber }}</b><br>

</p>

<p>
    Vielen Dank und freundliche Grüsse<br>
    Ihr Team der Campusbibliothek Brugg-Windisch
</p>
