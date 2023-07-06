import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { SignupComponent } from './components/signup/signup.component';
import { LoginComponent } from './components/login/login.component';
import { ArticleDetailComponent } from './components/article-detail/article-detail.component';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';
import { LegalMentionComponent } from './components/legal-mention/legal-mention.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { UserAdministrationComponent } from './components/user-administration/user-administration.component';
import { CardArticleComponent } from './components/card-article/card-article.component';
import { AlertComponent } from './shared/alert/alert.component';
import { PaymentPageComponent } from './components/payment-page/payment-page.component';
import { AdminAdministrationComponent } from './components/admin-administration/admin-administration.component';
import { ArticlesComponent } from './components/admin-administration/articles/articles.component';
import { EditorComponent } from './components/admin-administration/editor/editor.component';
import { AuthorComponent } from './components/admin-administration/author/author.component';
import { TypeComponent } from './components/admin-administration/type/type.component';
import { UsersComponent } from './components/admin-administration/users/users.component';
import {AuthGuard} from "./guards/auth.guard";
import { SelectCivilityComponent } from './form/select-civility/select-civility.component';
import { PasswordFieldComponent } from './form/password-field/password-field.component';
import { FirstnameFieldComponent } from './form/firstname-field/firstname-field.component';
import { LastnameFieldComponent } from './form/lastname-field/lastname-field.component';
import { StreetFieldComponent } from './form/street-field/street-field.component';
import { AddressComplementFieldComponent } from './form/address-complement-field/address-complement-field.component';
import { ZipCodeFieldComponent } from './form/zip-code-field/zip-code-field.component';
import { CityFieldComponent } from './form/city-field/city-field.component';
import { EmailFieldComponent } from './form/email-field/email-field.component';
import { CountryFieldComponent } from './form/country-field/country-field.component';
import { ConfirmPasswordFieldComponent } from './form/confirm-password-field/confirm-password-field.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    SignupComponent,
    LoginComponent,
    ArticleDetailComponent,
    ShoppingCartComponent,
    LegalMentionComponent,
    PageNotFoundComponent,
    UserAdministrationComponent,
    CardArticleComponent,
    AlertComponent,
    PaymentPageComponent,
    AdminAdministrationComponent,
    ArticlesComponent,
    EditorComponent,
    AuthorComponent,
    TypeComponent,
    UsersComponent,
    SelectCivilityComponent,
    PasswordFieldComponent,
    FirstnameFieldComponent,
    LastnameFieldComponent,
    StreetFieldComponent,
    AddressComplementFieldComponent,
    ZipCodeFieldComponent,
    CityFieldComponent,
    EmailFieldComponent,
    CountryFieldComponent,
    ConfirmPasswordFieldComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    AuthGuard,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
