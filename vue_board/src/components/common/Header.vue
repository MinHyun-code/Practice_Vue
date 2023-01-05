<template>
	<header>
		<nav class="navbar navbar-expand-lg fixed-top navbar-dark bg-dark">
			<div class="container-fluid">
				<router-link to="/" class="navbar-brand">Must Go</router-link>
				<div class="navbar-collapse offcanvas-collapse" id="navbarsExampleDefault">
					<ul class="navbar-nav me-auto mb-2 mb-lg-0">
						<li class="nav-item"><router-link to="/board/list" class="nav-link active"> &nbsp; 게시판 &nbsp; </router-link></li>
						<li class="nav-item"><a class="nav-link active" href="javascript:;"> &nbsp; 메뉴2 &nbsp; </a></li>
						<li class="nav-item"><a class="nav-link active" href="javascript:;"> &nbsp; 메뉴3 &nbsp; </a></li>
						<li class="nav-item"><a class="nav-link active" href="javascript:;"> &nbsp; 메뉴4 &nbsp; </a></li>
					</ul>
				</div>
			</div>
		</nav>
	</header>
</template>
<script>
export default {
	
}
</script>