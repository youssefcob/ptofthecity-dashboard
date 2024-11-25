<template>
  

    <div class="header">
    <h1>Admins</h1>
    
    <div class="btn-search-wrapper">
        <router-link to="/dashboard/admins" class="add">Admins</router-link>
    
    </div>
    
    </div>
    </template>
    
    <style scoped lang="scss">
    
    .header {
    padding:1rem;
    // height:30px;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);
    display:flex;
    justify-content:space-between;
    .btn-search-wrapper{
    display:flex;
    gap:2rem;
    align-items: center;
    .add{
        padding:1rem;
        background-color: $green;
        color:white;
        border:none;
        border-radius:10px;
        cursor:pointer;
    }
    input{
        padding:1rem;
        border-radius:10px;
        border:none;
        width:20rem;
    }
    }
    }
    
    </style>