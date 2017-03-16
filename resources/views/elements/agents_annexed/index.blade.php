@include('layout.plugins.css-preloader')

<div  class="col-md-12" id="container">
	<div class="panel-body">
		<div class="box box-solid box-primary">
			<div class="box-header">
				<h3 class="panel-title">
					<span class="glyphicon glyphicon-list"></span> Lista de Anexos
					<div class="btn-group pull-right">
						<a href="#" class="btn btn-success btn-sm" onClick="liberar_anexos()">Liberar Anexo</a>
					</div>
				</h3>
			</div>
			<div class="box-body">
				<div class="row text-center" >
					<div class="col-xs-12">
						<div class="table-responsive">
							<table class="table table-bordered table-hover">
								@foreach ($tabla_anexos as $key => $tabla_anexo)
									<tr>
										@foreach ($tabla_anexo as $key => $anexo)
											<td>
												<center>
													<a href="#"  class='{{ $anexo['btn']  }}' onclick="assignAnexxed('{{ $anexo['name'] }}');" >
														<center>
															<img class="img-responsive" width="74" height="74" name={{ $anexo['name'] }}  src={{ asset('cosapi/img/'.$anexo['image']) }}  />
														</center>
														<center>
															<span style='color:black'>
																Anexo {{ $anexo['name'] }}
																<br>
																@if($anexo['user']['primer_nombre'] != '')
																	<font style="color:#088A29;">{{$anexo['user']['primer_nombre']}} {{$anexo['user']['apellido_paterno']}}</font>
																@else
																	<font style="color:#088A29;"> - </font>
																@endif
															</span>
														</center>
													</a>
												</center>
											</td>
										@endforeach
									</tr>
								@endforeach
							</table>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>

</div>
