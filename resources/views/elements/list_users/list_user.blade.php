<input type="hidden" name="_token" value="{!! csrf_token() !!}">

<div class="panel panel-default">
    <div class="panel-body" >
        <div class="tab-pane fade active in" id="panel-report">
            <table id="table-list-user" class="table table-bordered display nowrap table-responsive" cellspacing="0" width="100%">
                <thead>
                <tr>
                    <th>Id</th>
                    <th>First Name</th>
                    <th>Second Name</th>
                    <th>Last Name</th>
                    <th>Second Last Name</th>
                    <th>Username</th>
                    <th>Role</th>
                    <th>Estado</th>
                    <th>Change Status</th>
                    <th>Change Password</th>
                </tr>
                </thead>
            </table>
        </div>
    </div>
</div>

<script type="text/javascript">
    $(document).ready(function(){
        buscar();
    })
    function buscar(){
        show_tab_list_user('list_users')
        DatableHide('table-list-user',[0,1])
    }
</script>