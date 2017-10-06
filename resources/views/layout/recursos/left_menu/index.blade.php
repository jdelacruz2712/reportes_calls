<aside class="main-sidebar">
  <section class="sidebar">
    @include('layout.recursos.left_menu.sidebar')

    <ul class="sidebar-menu" data-widget="tree" id="menuleft">
      <li class="header">Menu </li>

      <template v-if="getRole === 'admin' || getRole === 'supervision'">
        @include('layout.recursos.left_menu.supervision')
      </template>
      
      <template v-if="getRole === 'user' ">  @include('layout.recursos.left_menu.user') </template>
      <template v-if="getRole === 'backoffice' ">  @include('layout.recursos.left_menu.backoffice') </template>

    </ul>
  </section>
</aside>
