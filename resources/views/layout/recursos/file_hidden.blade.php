<input type="hidden" value="{{ $password}}" id="type_password">
<input type="hidden" value="{{ Session::get('UserId')}}" id="user_id">
<input type="hidden" value="{{$_SERVER['REMOTE_ADDR']}}" id="ip">
<font id="present_hour"><input type="hidden" value="" id="hour"></font>
<font id="present_date"><input type="hidden" value="{{ date('Y-m-d')}}" id="date"></font>
