<input type="hidden" value="{{$password}}" id="type_password">
<input type="hidden" value="{{Session::get('UserId')}}" id="user_id">
<input type="hidden" value="{{Session::get('UserSystem')}}" id="user_name">
<input type="hidden" value="{{Session::get('UserRole')}}" id="user_role">
<input type="hidden" value="{{Session::get('AssistanceUser')}}" id="assistence_user">
<input type="hidden" value="{{$_SERVER['REMOTE_ADDR']}}" id="ip">
<input type="hidden" value="{{Session::get('QueueAdd')}}" id="queueAdd">
