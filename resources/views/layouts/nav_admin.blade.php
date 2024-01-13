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
                <a href="{{ env('APP_URL') }}/admin">
                    <div class="nav-icon"><span class="glyphicon glyphicon-shopping-cart glyphicon-sm" aria-hidden="true"></span></div>
                    <div class="nav-text"> Bestellungen</div>
                </a>
            </li>
            <li class="sidebar-nav-text">
                <a href="{{ env('APP_URL') }}/admin/themeboxes">
                    <div class="nav-icon"><span class="glyphicon glyphicon-inbox glyphicon-sm" aria-hidden="true"></span></div>
                    <div class="nav-text"> Themenkisten</div>
                </a>
            </li>
            <li class="sidebar-nav-text">
                <a href="{{ env('APP_URL') }}/admin/categories">
                    <div class="nav-icon"><span class="glyphicon glyphicon-list-alt glyphicon-sm" aria-hidden="true"></span></div>
                    <div class="nav-text"> Kategorien</div>
                </a>
            </li>
            <li class="sidebar-nav-text">
                <a href="{{ env('APP_URL') }}/admin/statistics">
                    <div class="nav-icon"><span class="glyphicon glyphicon-stats glyphicon-sm" aria-hidden="true"></span></div>
                    <div class="nav-text"> Statistiken</div>
                </a>
            </li>
            <li class="sidebar-nav-text">
                <a href="{{ env('APP_URL') }}/admin/blockedPeriods">
                    <div class="nav-icon"><span class="glyphicon glyphicon-calendar glyphicon-sm" aria-hidden="true"></span></div>
                    <div class="nav-text"> Sperrfristen</div>
                </a>
            </li>
            <li class="sidebar-nav-text">
                <a href="{{ env('APP_URL') }}/admin/email">
                    <div class="nav-icon"><span class="glyphicon glyphicon-envelope glyphicon-sm" aria-hidden="true"></span></div>
                    <div class="nav-text"> E-Mails</div>
                </a>
            </li>
            <li class="sidebar-nav-text">
                <a href="{{ env('APP_URL') }}/admin/changeCredentials">
                    <div class="nav-icon"><span class="glyphicon glyphicon-edit glyphicon-sm" aria-hidden="true"></span></div>
                    <div class="nav-text"> Nutzerdaten ändern</div>
                </a>
            </li>
            <li class="sidebar-nav-text">
                <a href="{{ env('APP_URL') }}/admin/logout">
                    <div class="nav-icon"><span class="glyphicon glyphicon-log-out glyphicon-sm" aria-hidden="true"></span></div>
                    <div class="nav-text"> Abmelden</div>
                </a>
            </li>
            <li class="sidebar-nav-text site-switch">
                <a href="{{ env('APP_URL') }}/user">
                    <div class="nav-icon"><span class="glyphicon glyphicon-home glyphicon-sm" aria-hidden="true"></span></div>
                    <div class="nav-text"> ThekRe Startseite</div>
                </a>
            </li>
        </ul>
    </div>
</div>
