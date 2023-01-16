<template>
	<main class="container" style="margin-top: 7rem!important;">
		<div>
			<div class="d-flex align-items-center p-3 my-3 text-white rounded shadow-sm" style="background-color: #212529;">
				<div class="lh-1">
					<h1 class="h5 mb-0 text-white lh-1" style="font-weight: bold;">게시판</h1>
				</div>
			</div>
			<div style="float: right; margin-bottom: 10px;">
				<select class="form-control" style="width: 110px; display: inline-block; margin-right: 10px;">
					<option> -- Select -- </option>
					<option>제목</option>
					<option>작성자</option>
				</select>
				<input class="form-control me-2" type="text" style="width: 180px; display: inline-block;"/>
				<button class="btn btn-outline-success" type="submit" style="margin-bottom: 3px;">Search</button>
			</div>
			<table class="table b-table table-striped table-hover table-bordered border mb-0">
				<thead role="rowgroup">
					<tr role="row">
						<th role="columnheader" scope="col" class="text-center" style="width: 600px;">제목</th>
						<th role="columnheader" scope="col" class="text-center" style="width: 100px;">작성일</th>
						<th role="columnheader" scope="col" class="text-center" style="width: 50px;">조회수</th>
						<th role="columnheader" scope="col" class="text-center" style="width: 70px;">작성자</th>
					</tr>
				</thead>
				<tbody tag="tbody">
                    <tr role="row"  v-for="(item) in boardList" :key="item.board_num" style="cursor:pointer" @click="boardDetailPop(item.board_num)">
                        <td role="cell">{{item.board_title}}</td>
                        <td role="cell" class="text-center">{{item.board_date}}</td>
                        <td role="cell" class="text-center">{{item.board_read_cnt}}</td>
                        <td role="cell" class="text-center">{{item.reg_id}}</td>
					</tr>
				</tbody>
			</table>
			<div>
</div>
			<a class="btn btn-sm btn-outline-secondary"  type="submit" v-on:click="boardInsertPop()">등록</a>
		<!-- paging start -->
			<b-pagination align="center" :total-rows="totalRows" v-model="currentPage" :per-page="10" v-on:click="getBoardList(currentPage)" style="margin-top: revert;"  v-show="noPage"/>
		<!-- paging end -->
		</div>
	</main>
	
</template>

<script>


	export default {
		components: {
			
		},
		data: () => ({
			boardList: [],
			totalRows : 0,
			currentPage: 1,
			limit: 10,
			noPage:true,
			searchValue1:'',
			searchValue2:'',

		}),
		methods: { 
			getBoardTotalCnt() {
				const form = new FormData();
				form.append('searchValue1', this.searchValue1);
				this.$axios.post('/api/board/cnt', form).then(res => {
					this.totalRows = res.data;
				})
			},

			getBoardList() {
				const form = new FormData();
				form.append('currentPage', this.currentPage);
				form.append('limit', this.limit);
				this.$axios.post("/api/board", form)
				.then((res)=>{
					this.boardList = res.data;
				})
			},
			boardDetailPop(board_num){
				const form = new FormData();
				this.$store.commit('setBoardData', '');
				form.append('board_num', board_num);
				this.$axios.post('/api/board/detail', form).then(res => {
					this.$store.commit('setBoardData', res.data);
				})
				this.$store.commit('modalBoardDetail_TF', true);
			},
			boardInsertPop() {
				this.$store.commit('modalBoardInsert_TF', true);
			}
		},
		mounted(currentPage) {
			this.getBoardTotalCnt();
			this.getBoardList(currentPage);
		}, 
		watch: {
			"$store.state.setBoardListCall": function() {
				if(this.$store.state.setBoardListCall == "Y"){
						this.getBoardTotalCnt();
						this.getBoardList();
						this.$store.commit('setBoardListCall', "N");
				}
			}
		}
	}
</script>


<style scoped>
/* .searchList-leave-active, .searchList-leave-to {
	animation: fadeInLeft 0s;
} */

</style>