<template>
	<div class="container-fluid">

		<h1 class="h3 mb-2 text-gray-800">게시판</h1>
		<p class="mb-4">DataTables is a third party plugin that is used to generate the demo table below.
			For more information about DataTables, please visit the </p>

		<div class="card shadow mb-4">
			<div class="card-header py-3">
				<h6 class="m-0 font-weight-bold text-primary">List</h6>
			</div>
			<div class="card-body">
				<div class="table-responsive">
					<div id="dataTable_wrapper" class="dataTables_wrapper dt-bootstrap4">
						<div class="row"><div class="col-sm-12 col-md-6">
							<div class="dataTables_length" id="dataTable_length">
								<label>Show 
									<select name="dataTable_length" aria-controls="dataTable" class="custom-select custom-select-sm form-control form-control-sm">
										<option value="10">10</option>
										<option value="25">25</option>
										<option value="50">50</option>
										<option value="100">100</option>
									</select> entries
								</label>
							</div>
						</div>
						<div class="col-sm-12 col-md-6">
							<div id="dataTable_filter" class="dataTables_filter"><label>Search:<input type="search" class="form-control form-control-sm" placeholder="" aria-controls="dataTable"></label>
							</div>
						</div>
					</div>
					<div class="row">
						<div class="col-sm-12">
							<table class="table table-bordered dataTable" id="dataTable" cellspacing="0" role="grid" aria-describedby="dataTable_info" style="width: 98%; text-align: center; font-size: 14px;">
						<thead>
							<tr role="row">
								<th class="sorting sorting_asc" tabindex="0" aria-controls="dataTable" rowspan="1" colspan="1" aria-sort="ascending" aria-label="Name: activate to sort column descending">제목</th>
								<th class="sorting" tabindex="0" aria-controls="dataTable" rowspan="1" colspan="1" aria-label="Position: activate to sort column ascending" style="width: 120px;">작성일</th>
								<th class="sorting" tabindex="0" aria-controls="dataTable" rowspan="1" colspan="1" aria-label="Office: activate to sort column ascending" style="width: 80px;">조회수</th>
								<th class="sorting" tabindex="0" aria-controls="dataTable" rowspan="1" colspan="1" aria-label="Age: activate to sort column ascending" style="width: 100px;">작성자</th>
							</tr>
						</thead>
						<tbody>
							<tr role="row"  v-for="(item) in boardList" :key="item.board_num" style="cursor:pointer" @click="boardDetailPop(item.board_num)">
								<td role="cell" style="text-align: left;">{{item.board_title}}</td>
								<td role="cell" class="text-center">{{item.board_date}}</td>
								<td role="cell" class="text-center">{{item.board_read_cnt}}</td>
								<td role="cell" class="text-center">{{item.reg_id}}</td>
							</tr>
						</tbody>
					</table>
					</div>
						</div>
						<div class="row">
							<div class="col-sm-12 col-md-5">
							</div>	
							<b-pagination align="center" :total-rows="totalRows" v-model="currentPage" :per-page="10" v-on:click="getBoardList(currentPage)" style="margin-top: revert;"  v-show="noPage"/>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
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
	table td {
		padding : 0.5rem;
	}
	.table-responsive{
		overflow: hidden;
	}
</style>