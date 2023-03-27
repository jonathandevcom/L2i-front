import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { ArticleDetailComponent } from './article-detail/article-detail.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { LegalMentionComponent } from './legal-mention/legal-mention.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { UserAdministrationComponent } from './user-administration/user-administration.component';

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
    UserAdministrationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
