<div class="col-md-2">
    <!-- Sidebar -->
    <div id="sidebar-wrapper">
        <ul class="sidebar-nav">
            <li class="sidebar-brand">
                <a href="https://www.fhnw.ch">
                    <img src="{{ env('APP_URL') }}/images/fhnw_logo_w_claim_de.svg" id="fhnw-logo" alt="fhnw logo">
                </a>
            </li>
            <li class="sidebar-nav-text">
                <a href="{{ env('APP_URL') }}/poweruser">
                    <div class="nav-text"><span class="glyphicon glyphicon-shopping-cart glyphicon-sm" aria-hidden="true"></span> Bestellungen</div>
                </a>
            </li>
            <li class="sidebar-nav-text">
                <a href="{{ env('APP_URL') }}/poweruser/themboxes">
                    <div class="nav-text"><span class="glyphicon glyphicon-inbox glyphicon-sm" aria-hidden="true"></span> Themenkisten</div>
                </a>
            </li>
            <li class="sidebar-nav-text">
                <a href="{{ env('APP_URL') }}/poweruser/logout">
                    <div class="nav-text"><span class="glyphicon glyphicon-log-out glyphicon-sm" aria-hidden="true"></span> Abmelden</div>
                </a>
            </li>
            <li class="sidebar-nav-text site-switch">
                <a href="{{ env('APP_URL') }}/user">
                    <div class="nav-text"><span class="glyphicon glyphicon-home glyphicon-sm" aria-hidden="true"></span> ThekRe Startseite</div>
                </a>
            </li>
        </ul>
    </div>
</div>