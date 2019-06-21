import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'pays-my-suffix',
        loadChildren: './pays-my-suffix/pays-my-suffix.module#GestAppPaysMySuffixModule'
      },
      {
        path: 'commune-my-suffix',
        loadChildren: './commune-my-suffix/commune-my-suffix.module#GestAppCommuneMySuffixModule'
      },
      {
        path: 'langue-my-suffix',
        loadChildren: './langue-my-suffix/langue-my-suffix.module#GestAppLangueMySuffixModule'
      },
      {
        path: 'reference-my-suffix',
        loadChildren: './reference-my-suffix/reference-my-suffix.module#GestAppReferenceMySuffixModule'
      },
      {
        path: 'categorie-my-suffix',
        loadChildren: './categorie-my-suffix/categorie-my-suffix.module#GestAppCategorieMySuffixModule'
      },
      {
        path: 'article-my-suffix',
        loadChildren: './article-my-suffix/article-my-suffix.module#GestAppArticleMySuffixModule'
      },
      {
        path: 'reduction-my-suffix',
        loadChildren: './reduction-my-suffix/reduction-my-suffix.module#GestAppReductionMySuffixModule'
      },
      {
        path: 'fournisseur-my-suffix',
        loadChildren: './fournisseur-my-suffix/fournisseur-my-suffix.module#GestAppFournisseurMySuffixModule'
      },
      {
        path: 'profile-my-suffix',
        loadChildren: './profile-my-suffix/profile-my-suffix.module#GestAppProfileMySuffixModule'
      },
      {
        path: 'utilisateur-my-suffix',
        loadChildren: './utilisateur-my-suffix/utilisateur-my-suffix.module#GestAppUtilisateurMySuffixModule'
      },
      {
        path: 'employe-my-suffix',
        loadChildren: './employe-my-suffix/employe-my-suffix.module#GestAppEmployeMySuffixModule'
      },
      {
        path: 'uti-profile-my-suffix',
        loadChildren: './uti-profile-my-suffix/uti-profile-my-suffix.module#GestAppUtiProfileMySuffixModule'
      },
      {
        path: 'habilitation-my-suffix',
        loadChildren: './habilitation-my-suffix/habilitation-my-suffix.module#GestAppHabilitationMySuffixModule'
      },
      {
        path: 'adresse-my-suffix',
        loadChildren: './adresse-my-suffix/adresse-my-suffix.module#GestAppAdresseMySuffixModule'
      },
      {
        path: 'article-compose-my-suffix',
        loadChildren: './article-compose-my-suffix/article-compose-my-suffix.module#GestAppArticleComposeMySuffixModule'
      },
      {
        path: 'stock-my-suffix',
        loadChildren: './stock-my-suffix/stock-my-suffix.module#GestAppStockMySuffixModule'
      },
      {
        path: 'mouvement-stock-my-suffix',
        loadChildren: './mouvement-stock-my-suffix/mouvement-stock-my-suffix.module#GestAppMouvementStockMySuffixModule'
      },
      {
        path: 'client-my-suffix',
        loadChildren: './client-my-suffix/client-my-suffix.module#GestAppClientMySuffixModule'
      },
      {
        path: 'partenaire-my-suffix',
        loadChildren: './partenaire-my-suffix/partenaire-my-suffix.module#GestAppPartenaireMySuffixModule'
      },
      {
        path: 'facture-my-suffix',
        loadChildren: './facture-my-suffix/facture-my-suffix.module#GestAppFactureMySuffixModule'
      },
      {
        path: 'commande-my-suffix',
        loadChildren: './commande-my-suffix/commande-my-suffix.module#GestAppCommandeMySuffixModule'
      },
      {
        path: 'vente-my-suffix',
        loadChildren: './vente-my-suffix/vente-my-suffix.module#GestAppVenteMySuffixModule'
      }
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ])
  ],
  declarations: [],
  entryComponents: [],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GestAppEntityModule {}
