import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
 
const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', loadChildren: './pages/login/login.module#LoginPageModule' },
  { path: 'menu', loadChildren: './pages/menu/menu.module#MenuPageModule' },
  { path: 'landing', loadChildren: './pages/landing/landing.module#LandingPageModule' },
  { path: 'register', loadChildren: './pages/register/register.module#RegisterPageModule' },  
  { path: 'recuperasenha', loadChildren: './pages/recuperasenha/recuperasenha.module#RecuperasenhaPageModule' },
  { path: 'devices', loadChildren: './pages/devices/devices.module#DevicesPageModule' },
  { path: 'splash', loadChildren: './pages/splash/splash.module#SplashPageModule' },  
  { path: 'noticias', loadChildren: './pages/noticias/noticias.module#NoticiasPageModule' },
  { path: 'agenda', loadChildren: './pages/agenda/agenda.module#AgendaPageModule' } ,
  { path: 'hospitais', loadChildren: './pages/hospitais/hospitais.module#HospitaisPageModule' },
  { path: 'incluirhosp', loadChildren: './pages/incluirhosp/incluirhosp.module#IncluirhospPageModule' },
  { path: 'edithosp', loadChildren: './pages/edithosp/edithosp.module#EdithospPageModule' },
  { path: 'consulta-nomeacoes', loadChildren: './pages/consulta-nomeacoes/consulta-nomeacoes.module#ConsultaNomeacoesPageModule' },
  { path: 'prontuarios', loadChildren: './pages/prontuarios/prontuarios.module#ProntuariosPageModule' },
  { path: 'novopaciente', loadChildren: './pages/novopaciente/novopaciente.module#NovopacientePageModule' },
  { path: 'novo-compromisso', loadChildren: './pages/novo-compromisso/novo-compromisso.module#NovoCompromissoPageModule' },
  { path: 'compromisso-lista', loadChildren: './pages/compromisso-lista/compromisso-lista.module#CompromissoListaPageModule' },
  { path: 'compromisso-cancelado', loadChildren: './pages/compromisso-cancelado/compromisso-cancelado.module#CompromissoCanceladoPageModule' },
  { path: 'compromisso-cumprido', loadChildren: './pages/compromisso-cumprido/compromisso-cumprido.module#CompromissoCumpridoPageModule' },
  { path: 'compromisso-nao-cumprido', loadChildren: './pages/compromisso-nao-cumprido/compromisso-nao-cumprido.module#CompromissoNaoCumpridoPageModule' },
  { path: 'atender', loadChildren: './pages/atender/atender.module#AtenderPageModule' },
  { path: 'exames', loadChildren: './pages/exames/exames.module#ExamesPageModule' },
  { path: 'fisico', loadChildren: './pages/fisico/fisico.module#FisicoPageModule' },
  { path: 'consultfisico', loadChildren: './pages/consultfisico/consultfisico.module#ConsultfisicoPageModule' },
  { path: 'editfisico', loadChildren: './pages/editfisico/editfisico.module#EditfisicoPageModule' },
  { path: 'sangue', loadChildren: './pages/sangue/sangue.module#SanguePageModule' },
  { path: 'consultsangue', loadChildren: './pages/consultsangue/consultsangue.module#ConsultsanguePageModule' },
  { path: 'editsangue', loadChildren: './pages/editsangue/editsangue.module#EditsanguePageModule' },
  { path: 'estaticas', loadChildren: './pages/estaticas/estaticas.module#EstaticasPageModule' },
  { path: 'grupos', loadChildren: './pages/grupos/grupos.module#GruposPageModule' },
  // { path: 'cadastroindiv', loadChildren: './pages/cadastroindiv/cadastroindiv.module#CadastroindivPageModule' },
  // { path: 'novocadastroindiv', loadChildren: './pages/novocadastroindiv/novocadastroindiv.module#NovocadastroindivPageModule' },
  // Cadastro Individual
  { path: 'cadastro-individual', loadChildren: './pages/cadastro-individual/cadastro-individual.module#CadastroIndividualPageModule' },
  { path: 'cadastro-individual-form', loadChildren: './pages/cadastro-individual/cadastro-individual-form/cadastro-individual-form.module#CadastroIndividualFormPageModule' },
  { path: 'cadastro-individual-form/edit/:codigo', loadChildren: './pages/cadastro-individual/cadastro-individual-form/cadastro-individual-form.module#CadastroIndividualFormPageModule' },
  { path: 'cadastro-individual-foto/:codigo', loadChildren: './pages/cadastro-individual/cadastro-individual-form/cadastro-individual-foto/cadastro-individual-foto.module#CadastroIndividualFotoPageModule' },
  { path: 'cadastro-individual-assinatura/:codigo', loadChildren: './pages/cadastro-individual/cadastro-individual-form/cadastro-individual-assinatura/cadastro-individual-assinatura.module#CadastroIndividualAssinaturaPageModule' },
  // Cadastro Domiciliar
  { path: 'cadastro-domiciliar', loadChildren: './pages/cadastro-domiciliar/cadastro-domiciliar.module#CadastroDomiciliarPageModule' },
  { path: 'cadastro-domiciliar-tabs', loadChildren: './pages/cadastro-domiciliar-tabs/cadastro-domiciliar-tabs.module#CadastroDomiciliarTabsPageModule' },
  // { path: 'cadastro-domiciliar-form', loadChildren: './pages/cadastro-domiciliar-tabs/cadastro-domiciliar-form/cadastro-domiciliar-form.module#CadastroDomiciliarFormPageModule' },
  // { path: 'cadastro-domiciliar-form/edit/:codigo', loadChildren: './pages/cadastro-domiciliar-form/cadastro-domiciliar-form.module#CadastroDomiciliarFormPageModule' },
  // { path: 'cadastro-domiciliar-familias', loadChildren: './pages/cadastro-domiciliar-familias/cadastro-domiciliar-familias.module#CadastroDomiciliarFamiliasPageModule' },

  { path: 'atendimento-individual', loadChildren: './pages/atendimento-individual/atendimento-individual.module#AtendimentoIndividualPageModule' }, { path: "atendimento-individual", loadChildren: "./pages/atendimento-individual/atendimento-individual.module#AtendimentoIndividualPageModule"},
  { path: "atendimento-individual-form", loadChildren: "./pages/atendimento-individual/atendimento-individual-form/atendimento-individual-form.module#AtendimentoIndividualFormPageModule"},
  { path: "atendimento-individual-individuos-form", loadChildren: "./pages/atendimento-individual/atendimento-individual-individuos-form/atendimento-individual-individuos-form.module#AtendimentoIndividualIndividuosFormPageModule"},
  { path: 'sigtap-form', loadChildren: './pages/sigtap-form/sigtap-form.module#SIGTAPFormPageModule' },
  { path: 'atendimento-individual-cidade', loadChildren: './pages/atendimento-individual/atendimento-individual-cidade/atendimento-individual-cidade.module#AtendimentoIndividualCidadePageModule' },
  { path: 'atendimento-domiciliar-list', loadChildren: './pages/atendimento-domiciliar-list/atendimento-domiciliar.module#AtendimentoDomiciliarPageModule' },
  { path: 'atendimento-domiciliar-form', loadChildren: './pages/atendimento-domiciliar-form/atendimento-domiciliar-form.module#AtendimentoDomiciliarFormPageModule' },
  { path: 'atendimento-domiciliar-foto', loadChildren: './pages/atendimento-domiciliar-form/atendimento-domiciliar-foto/atendimento-domiciliar-foto.module#AtendimentoDomiciliarFotoPageModule' },
  { path: 'ficha-complementar-lista', loadChildren: './pages/ficha-complementar-lista/ficha-complementar.module#FichaComplementarPageModule' },
  { path: 'ficha-complementar-form', loadChildren: './pages/ficha-complementar-form/ficha-complementar-form.module#FichaComplementarFormPageModule' },
  { path: 'foto', loadChildren: './pages/foto/foto.module#FotoPageModule' },
  { path: 'atendimento-individual-tabs', loadChildren: './pages/atendimento-individual-tabs/atendimento-individual-tabs.module#AtendimentoIndividualTabsPageModule' },
  { path: 'marcadores', loadChildren: './pages/marcadores/marcadores.module#MarcadoresPageModule' },
  { path: 'marcadores-form', loadChildren: './pages/marcadores/marcadores-form/marcadores-form.module#MarcadoresFormPageModule' },
  { path: 'marcadores-form/:codigoMarcador', loadChildren: './pages/marcadores/marcadores-form/marcadores-form.module#MarcadoresFormPageModule' },
  { path: 'marcadores-foto', loadChildren: './pages/marcadores/marcadores-foto/marcadores-foto.module#MarcadoresFotoPageModule' },
  { path: 'marcadores-foto/:codigoMarcador', loadChildren: './pages/marcadores/marcadores-foto/marcadores-foto.module#MarcadoresFotoPageModule' },
  { path: 'responsavel-form', loadChildren: './pages/responsavel-form/responsavel-form.module#ResponsavelFormPageModule' },




];
 
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
