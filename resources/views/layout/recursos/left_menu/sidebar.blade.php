<!-- Sidebar user panel -->
<div class="user-panel" @click="loadModalStatus">
  <div class="pull-left image">
    <img  :src="'storage/' + srcAvatar" class="img-circle" alt="User Image">
  </div>
  <div  class="pull-left info">
    <input type="hidden"  v-model="getEventId" id="getEventId">
    <p><template v-if="getNameComplete">@{{ getNameComplete }}</template><template v-else>...</template></p>
    <a href="#">
      <template v-if="getEventName">
        <template v-if="statusQueueAddAsterisk === true">
          <i :class ="((annexedStatusAsterisk == '0') ? 'fa fa-circle text-green' : 'fa fa-circle text-red')"></i>
        </template>
        <template v-else> <i class ="fa fa-circle text-red"></i> </template>
        @{{ getEventName }}
      </template>
    </a>
  </div>
</div>
