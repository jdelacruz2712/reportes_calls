<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        @include('layout.recursos.icon_title')
        <title>@yield('title')</title>
        <meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport">
        <meta name="_token" content="{{ csrf_token() }}">
        {!!Html::style('css/dashboard_user.min.css?version='.date('YmdHis')) !!}
        {!!Html::style('css/notifications.min.css?version='.date('YmdHis')) !!}
        {!!Html::script('js/dashboard_user.min.js?version='.date('YmdHis')) !!}
        @yield('css')
    </head>
    <body style="padding-right: 0px !important;">
        <div class="container-fluid">
            <p></p>
            @yield('content')
        </div>
        {!!Html::script('js/notifications.min.js?version='.date('YmdHis')) !!}
        {!!Html::script('js/dashboardUserFunctions.min.js?version='.date('YmdHis')) !!}
        @yield('scripts')
        <script>
            Vue.http.headers.common['X-CSRF-TOKEN'] = document.querySelector('meta[name="_token"]').getAttribute('content')
            var dashboardUser = new Vue({
                el: '#dashboardUser',
                data: {
                    showUser: '',
                    nameComplete: '',
                    TypeDocument: '',
                    numberDocument: '',
                    nameSede: '',
                    nameArea: '',
                    arrayPhoneCall: [],
                    arrayPersonalContact: [],
                    showLoading: false
                },
                methods: {
                    sendUrlRequest: async function (url, parameters = {}) {
                        try {
                            let response = await this.$http.post(url, parameters)
                            return response.data
                        } catch (error) { return error.status }
                    },
                    getInformationCall: async function() {
                        this.showLoading = true
                        let parameters = {'idCall' : this.showUser}
                        let response = await this.sendUrlRequest('/getInformationCall', parameters)
                        if(response){
                            this.nameComplete = response.nameComplete
                            this.TypeDocument = response.TypeDocument
                            this.numberDocument = response.numberDocument
                            this.nameSede = response.nameSede
                            this.nameArea = response.nameArea
                            this.arrayPhoneCall = response.phoneNumber
                            this.arrayPersonalContact = response.personalContact
                        }
                        this.showLoading = false
                    }
                }
            })
        </script>
        {!!Html::script('js/form/formDashboardUser.min.js?version='.date('YmdHis')) !!}
    </body>
</html>
