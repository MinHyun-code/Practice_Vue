<template>
       <b-modal id="updateHelpDesk" size="lg" v-bind:title="this.$i18n.t('text.T00073')" ref="updateHelpDesk">

<div class="card-body">
  <form data-vv-scope="updateHelpDesk">
  <div class="position-relative row form-group">
    <label class="col-sm-2 col-form-label">{{$t('text.T00014')}}</label>
    <div class="col-12 col-sm-4">
      <input type="text" class="form-control" v-model="helpData.applicant" v-validate="{required:true}" data-vv-name="valid_applicant" v-bind:class="{'is-invalid': errors.has('updateHelpDesk.valid_applicant')}" :disabled="true">
      <span class="invalid-feedback" v-show="errors.has('updateHelpDesk.valid_applicant')">{{$t('message.M00032')}}</span>
    </div>
    <label class="col-12 col-sm-2 col-form-label">{{$t('text.T00225')}}</label>
    <div class="col-12 col-sm-4">
      <select class="form-control" v-model="helpData.system_type" data-vv-name="valid_systemType" v-validate="{required:true}" v-bind:class="{'is-invalid': errors.has('updateHelpDesk.valid_systemType')}"
         :disabled="helpDeskStatus != 99">
           <option value="">--Select--</option>
           <option value="E">Echoline</option>
           <option value="M">MyVoice</option>
      </select>
      <p class="invalid-feedback" v-show="errors.has('updateHelpDesk.valid_systemType')">
        {{$t('text.T00036')}}
      </p>
    </div>
  </div>

  <div class="position-relative row form-group">
    <label class="col-12 col-sm-2 col-form-label">{{$t('text.T00022')}}</label>
    <div class="col-12 col-sm-4">
      <select class="form-control" v-model="helpData.division" data-vv-name="valid_division" v-validate="{required:true}" v-bind:class="{'is-invalid': errors.has('updateHelpDesk.valid_division')}"
             :disabled="helpDeskStatus == 1 || helpDeskStatus == 2 || helpDeskStatus == 3 || helpDeskStatus == 4 || (userEmail != helpData.create_user_mail && helpDeskStatus == 0)">
         <option value="">--Select--</option>
         <option value="1">{{$t('text.T00027')}}</option>
         <option value="2">{{$t('text.T00028')}}</option>
         <option value="3">{{$t('text.T00030')}}</option>
      </select>
      <p class="invalid-feedback" v-show="errors.has('updateHelpDesk.valid_division')">
        {{$t('message.M00033')}}
      </p>
    </div>
    <label class="col-12 col-sm-2 col-form-label">{{$t('text.T00016')}}</label>
    <div class="col-12 col-sm-4">
      <input type="date" class="form-control" v-on:blur="checkHelpDate(1)" v-model="helpData.resolution_dt"
             v-validate="{required:true}" data-vv-name="valid_resolution_dt" v-bind:class="{'is-invalid': errors.has('updateHelpDesk.valid_resolution_dt')}"
             :disabled="helpDeskStatus == 1 || helpDeskStatus == 2 || helpDeskStatus == 3 || helpDeskStatus == 4 || (userEmail != helpData.create_user_mail && helpDeskStatus == 0)">
      <p class="invalid-feedback" v-show="errors.has('updateHelpDesk.valid_resolution_dt')">
       {{$t('message.M00034')}}
      </p>
      <span class="custom-invalid-feedback" v-show="isEarlier1">{{$t('message.M00035')}}</span>
    </div>
  </div>

  <div class="position-relative row form-group">
    <label class="col-sm-2 col-form-label">{{$t('text.T00006')}}</label>
    <div class="col-sm-10">
      <input type="text" class="form-control" v-model="helpData.title" v-validate="{required:true}" data-vv-name="valid_title" v-bind:class="{'is-invalid': errors.has('updateHelpDesk.valid_title')}"
             :disabled="helpDeskStatus == 1 || helpDeskStatus == 2 || helpDeskStatus == 3 || helpDeskStatus == 4 || (userEmail != helpData.create_user_mail && helpDeskStatus == 0)">
      <span class="invalid-feedback" v-show="errors.has('updateHelpDesk.valid_title')">
        {{$t('message.M00036')}}
      </span>
    </div>
  </div>

  <div class="position-relative row form-group">
    <label class="col-sm-2 col-form-label">{{$t('text.T00088')}}</label>
    <div class="col-sm-10">
      <textarea class="form-control" rows="12" maxlength="2000" v-model="helpData.contents" v-validate="{required:true}" data-vv-name="valid_contents" v-bind:class="{'is-invalid': errors.has('updateHelpDesk.valid_contents')}"
               :disabled="helpDeskStatus == 1 || helpDeskStatus == 2 || helpDeskStatus == 3 || helpDeskStatus == 4 || (userEmail != helpData.create_user_mail && helpDeskStatus == 0)"></textarea>
      <span class="invalid-feedback" v-show="errors.has('updateHelpDesk.valid_contents')">
        {{$t('message.M00037')}}
      </span>
    </div>
  </div>
</form>

<form data-vv-scope="updateHelpDesk2">
<div v-show="(userTeam == 'D80000' && helpDeskStatus == 0) || helpDeskStatus == 1 || helpDeskStatus == 2 || helpDeskStatus == 3  || helpDeskStatus == 4">

 <div class="position-relative row form-group">
    <label class="col-12 col-sm-2 col-form-label">{{$t('text.T00089')}}</label>
    <div class="position-relative form-group form-check col-12 col-sm-4">
        <div class="position-relative form-check form-check-inline" style="top: 7px;">
          <label class="form-check-label"><input type="radio" value="1" v-model="helpData.status" class="form-check-input" :disabled="helpDeskStatus == 2 || (helpDeskStatus == 1 && (userEmail != helpData.update_user_mail))"
            v-on:click="checkStatus(1)">{{$t('text.T00099')}}</label>
        </div>
        <div class="position-relative form-check form-check-inline" style="top: 7px;">
          <label class="form-check-label"><input type="radio" value="3" v-model="helpData.status" class="form-check-input" :disabled="helpDeskStatus == 2 || (helpDeskStatus == 1 && (userEmail != helpData.update_user_mail))"
            v-on:click="checkStatus(3)">{{$t('text.T00170')}}</label>
        </div>
        <div class="position-relative form-check form-check-inline" style="top: 7px;">
          <label class="form-check-label"><input type="radio" value="4" v-model="helpData.status" class="form-check-input" :disabled="helpDeskStatus == 2 || (helpDeskStatus == 1 && (userEmail != helpData.update_user_mail))"
            v-on:click="checkStatus(4)">{{$t('text.T00229')}}</label>
        </div>
    </div>
    <label class="col-12 col-sm-2 col-form-label">{{$t('text.T00024')}}</label>
    <div class="col-12 col-sm-4">
      <input type="date" class="form-control" v-model="helpData.receive_dt" :disabled="true">
    </div>
  </div>

  <div class="position-relative row form-group" v-show="statusReject">
    <label class="col-sm-2 col-form-label">{{$t('text.T00090')}}</label>
    <div class="col-sm-10">
       <textarea class="form-control" v-model="helpData.comment2" rows="3" :disabled="comment2Disable"></textarea>
    </div>
  </div>

  <div class="position-relative row form-group">
      <label class="col-12 col-sm-2 col-form-label">{{$t('text.T00025')}}</label>
      <div class="col-12 col-sm-4">
        <input type="text" class="form-control" v-model="helpData.per_in_cha_name"  v-validate="{required:true}" data-vv-name="valid_per_in_cha_name" v-bind:class="{'is-invalid': errors.has('updateHelpDesk.valid_per_in_cha_name')}" :disabled="true"> <!--:disabled="helpDeskStatus != 0" -->
        <span class="invalid-feedback" v-show="errors.has('updateHelpDesk.valid_per_in_cha_name')">{{$t('message.M00072')}}</span>
      </div>
      <label class="col-12 col-sm-2 col-form-label" v-show="statusReject2">{{$t('text.T00026')}}</label>
      <div class="col-12 col-sm-4"  v-show="statusReject2">
        <input type="date" class="form-control" v-model="helpData.target_dt" v-on:blur="checkHelpDate(2)"
               v-validate="{required:statusReject2}" data-vv-name="valid_target_dt" v-bind:class="{'is-invalid': errors.has('updateHelpDesk2.valid_target_dt')}" :disabled="targetDisable">
        <p class="invalid-feedback" v-show="errors.has('updateHelpDesk2.valid_target_dt')">{{$t('message.M00038')}}</p>
        <span class="custom-invalid-feedback" v-show="isEarlier2">{{$t('message.M00035')}}</span>
      </div>
  </div>
</div>
</form>

 <form data-vv-scope="updateHelpDesk3" v-show="statusReject3">
 <div v-show="(userTeam == 'D80000' && helpDeskStatus == 1) || helpDeskStatus == 2">
   <div class="position-relative row form-group">
      <label class="col-sm-2 col-form-label">{{$t('text.T00090')}}</label>
      <div class="col-sm-10">
         <textarea class="form-control" v-model="helpData.comment" rows="3"
        :disabled="helpDeskStatus == 2 || (helpDeskStatus == 1 && userEmail != helpData.update_user_mail)"></textarea>
      </div>
   </div>

   <div class="position-relative row form-group">
     <label class="col-12 col-sm-2 col-form-label">{{$t('text.T00091')}}</label>
     <div class="position-relative form-group form-check col-12 col-sm-4">
        <label class="form-check-label">
           <input type="radio" value="2" v-on:change="foo" v-model="helpData.status2" class="form-check-input" v-validate="{required:true}" data-vv-name="valid_status2" v-bind:class="{'is-invalid': errors.has('updateHelpDesk3.valid_status2')}"
           :disabled="helpDeskStatus == 2 || (helpDeskStatus == 1 && userEmail != helpData.update_user_mail)">{{$t('text.T00031')}}</label>
           <p class="invalid-feedback" v-show="errors.has('updateHelpDesk3.valid_status2')">{{$t('message.M00040')}}</p>
     </div>
     <label class="col-12 col-sm-2 col-form-label">{{$t('text.T00021')}}(H)</label>
     <div class="col-12 col-sm-4">
       <input type="text" class="form-control" v-model="helpData.work_hour" oninput="javascript: this.value = this.value.replace(/[^0-9.]/g, '');"
       :disabled="helpDeskStatus == 2 || (helpDeskStatus == 1 && userEmail != helpData.update_user_mail)">
     </div>
   </div>
 </div>
</form>

</div>

<button type="button" class="btn btn-primary" v-on:click="makeBusy('insertHelpDesk')"  style="width: 70px;"
 v-show="!helpBusyYn && (helpDeskStatus != 2 && (helpDeskStatus == 99 || (userEmail == helpData.create_user_mail && helpDeskStatus == 0) ||
                                                ( userTeam == 'D80000'&& helpDeskStatus == 0) || (helpDeskStatus == 1 && userEmail == helpData.update_user_mail) ||
                                                ( userTeam == 'D80000'&& helpDeskStatus == 3) || (userTeam == 'D80000'&& helpDeskStatus == 4)) )"><b>OK</b></button>
<button type="button" class="btn btn-primary" v-show="helpBusyYn" :disabled="helpBusyYn" style="width: 70px;"><b-spinner small variant="light" label="Small Spinner"></b-spinner></button>

<button type="button" class="btn btn-secondary" v-on:click="hideModal('updateHelpDesk')"><b>Cancel</b></button>
<button type="button" class="btn btn-dark" v-on:click="deleteHelpDesk" v-show="(userEmail == helpData.create_user_mail) && (helpDeskStatus == 0)"><b>Delete</b></button>
</b-modal>
</template>

<script>
export default {
  
}
</script>
