<template>
    <body class="bg-gradient-primary">
        <div class="container">
            <!-- Outer Row -->
            <div class="row justify-content-center">
                <div class="col-xl-10 col-lg-12 col-md-9">
                    <div class="card o-hidden border-0 shadow-lg my-5">
                        <div class="card-body p-0">
                            <!-- Nested Row within Card Body -->
                            <div class="row">
                                <div class="col-lg-6 d-none d-lg-block bg-login-image"></div>
                                <div class="col-lg-6">
                                    <div class="p-5">
                                        <div class="text-center">
                                            <h1 class="h4 text-gray-900 mb-4">Welcome Back!</h1>
                                        </div>
                                        <form class="user">
                                            <div class="form-group">
                                                <input type="email" v-model="user_id" class="form-control form-control-user" aria-describedby="emailHelp"
                                                    placeholder="Enter Email Address...">
                                            </div>
                                            <div class="form-group">
                                                <input type="password" v-model="user_pw" class="form-control form-control-user" placeholder="Password" @keydown.enter="login()">
                                            </div>
                                            <div class="form-group">
                                                <div class="custom-control custom-checkbox small">
                                                    <input type="checkbox" class="custom-control-input" id="customCheck">
                                                    <label class="custom-control-label" for="customCheck">Remember
                                                        Me</label>
                                                </div>
                                            </div>
                                            <a class="btn btn-primary btn-user btn-block"  v-on:click="login()">
                                                Login
                                            </a>
                                            <hr>
                                            <a href="index.html" class="btn btn-google btn-user btn-block">
                                                <i class="fab fa-google fa-fw"></i> Login with Google
                                            </a>
                                            <a href="index.html" class="btn btn-facebook btn-user btn-block">
                                                <i class="fab fa-facebook-f fa-fw"></i> Login with Facebook
                                            </a>
                                        </form>
                                        <hr>
                                        <div class="text-center">
                                            <a class="small" href="forgot-password.html">Forgot Password?</a>
                                        </div>
                                        <div class="text-center">
                                            <router-link to="/join" class="small">
                                                Create an Account!
                                            </router-link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </body>
</template>


<script>
import { toast } from 'vue3-toastify';
export default {
    data:() => ({
        user_id : "",
        user_pw : "",
    }),
	methods:{
        login(){
            const form = new FormData();
            form.append('user_id', this.user_id);
            form.append('user_pw', this.user_pw);

            this.$axios.post('/api/login', form).then(res => {
                if(res.data.login_tf == true){
                    this.$store.commit('setLoginProcess', res.data);
                    this.$store.commit('saveStateToStorage');
                    this.$router.push('/main');
                    toast.success(res.data.message);
                } else {
                    toast.error(res.data.message);
                }
			})
        },
    }
}
</script>

<style>
  .c-toast--error {
    background-color: rgb(212, 24, 24);
  }  
</style>