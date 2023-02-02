<template>
	<div class="container-fluid">

		<h1 class="h3 mb-2 text-gray-800">메모</h1>
		<p class="mb-4">일정 > 메모</p>

		<div class="card shadow mb-4">
			<div class="card-header py-3">
				<h6 class="m-0 font-weight-bold text-primary"></h6>
			</div>
			<div class="card-body">
				<div class="table-responsive">
                    <table class="table table-bordered">
                        <tr>
                            <th>이미지</th>
                            <td>이미지</td>
                            <th>아이디</th>
                            <td><input type="text" value="안민현"/></td>
                        </tr>
                        <tr>
                            <th>이름</th>
                            <td><input type="text" value="안민현"/></td>
                            <th>비밀번호</th>
                            <td><input type="text" value="안민현"/></td>
                        </tr>
                        <tr>
                            <th>생년월일</th>
                            <td><input type="text" value="안민현"/></td>
                            <th>사용자 구분</th>
                            <td><input type="text" value="안민현"/></td>
                        </tr>
                    </table>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
    data: () => ({
        user_id: '',
        user_pw: '',
        user_type: '',
        user_birth: '',
        
    }), 
    methods: {
        getUserInfo() {
            this.$axios.get('/api/mypage/' + this.user_id).then(res => {
                console.log(res.data);
            })
        }
    }

}
</script>

<style scoped>
    table th {
        width: 150px;
    }
    
</style>