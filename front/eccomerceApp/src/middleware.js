  import { NextResponse } from "next/server";
import  { NextRequest } from 'next/server'

const secret = process.env.SECRET;
export function middleware(request) {
  const nextUrl  = request.nextUrl;
  const url  = request.url;
  var token = request.cookies.get('access_token');
  var refreshToken = request.cookies.get('refreshToken');

  var permission = request.cookies.get('permission');
  if(token && nextUrl.pathname.startsWith('/login'))
  {
    return NextResponse.redirect(new URL('/', request.url))
  }else if(token && nextUrl.pathname.startsWith('/register')){
    return NextResponse.redirect(new URL('/', request.url))

  }
  else if(!token && !refreshToken && nextUrl.pathname.startsWith('/dashboard')){ 
 
    return NextResponse.redirect(new URL('/login',request.url))
  }else if(token && url.includes('/products/edit'))
  {
    if(permission['value'].indexOf("edit-product") ===-1){

      return NextResponse.redirect(new URL('/404',request.url))
    }
    

  }else if(token && url.includes('/products/show'))
  {
    if(permission['value'].indexOf("show-product") ===-1){

      return NextResponse.redirect(new URL('/404',request.url))
    }
  }else if(token && url.includes('/create-product')){
    if(permission['value'].indexOf("create-product") ===-1){

      return NextResponse.redirect(new URL('/404',request.url))
    }
  }else if(token && url.includes('/products')){
    if(permission['value'].indexOf("view-products") ===-1){

      return NextResponse.redirect(new URL('/404',request.url))
    }
  }  /* category */
  else if(token && url.includes('/categories/edit'))
  {
    if(permission['value'].indexOf("edit-category") ===-1){

      return NextResponse.redirect(new URL('/404',request.url))
    }
    

  }else if(token && url.includes('/create-category')){
    if(permission['value'].indexOf("create-category") ===-1){

      return NextResponse.redirect(new URL('/404',request.url))
    }
  }
  else if(token && url.includes('/categories/show')){
    if(permission['value'].indexOf("view-category") ===-1){

      return NextResponse.redirect(new URL('/404',request.url))
    }
  }
  else if(token && url.includes('/categories')){
    if(permission['value'].indexOf("view-categories") ===-1){

      return NextResponse.redirect(new URL('/404',request.url))
    }
  }
  else{
    return NextResponse.next();

  } 
   
}
