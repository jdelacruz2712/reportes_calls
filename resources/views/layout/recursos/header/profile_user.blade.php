<li class="dropdown user user-menu">
    <a href="#" class="dropdown-toggle" data-toggle="dropdown">
        <img :src="'storage/' + srcAvatar" class="user-image" alt="User Image">
        <span class="hidden-xs">Sapia</span>
    </a>
    <ul class="dropdown-menu">
        <!-- User image -->
        <li class="user-header">
            <img :src="'storage/' + srcAvatar" class="img-circle" alt="User Image">
            <p>
                @{{ getNameComplete + ' - ' }}<font id="UserNameRole">@{{getRole}}</font>
                <small>{{ Date::now()->format('j F Y') }}</small>
            </p>
        </li>
        <!-- Menu Footer-->
        <li class="user-footer">
            <div class="pull-left">
                <a href="#" class="btn btn-default btn-flat reportes" id="profile_users" >Profile</a>
            </div>
            <div class="pull-right">
                <a href="#" onClick="javascript:disconnect()" class="btn btn-default btn-flat">Sign out</a>
            </div>
        </li>
    </ul>
</li>
