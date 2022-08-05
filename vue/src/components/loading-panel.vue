<template>
  <div class="loading-panel">
    <div class="loading-panel__spinner"></div>
  </div>
</template>

<style scoped>
.loading-panel {
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.1);

  display: flex;
  justify-content: center;
  align-items: center;
}

.loading-panel__spinner {
   /* from https://stackoverflow.com/questions/6091253/overlay-with-spinner */
  height:60px;
  width:60px;
  border: 1px solid red;
  margin:0px auto;
  animation: rotation 1.6s infinite linear;
  border-left:6px solid rgba(0,174,239,.15);
  border-right:6px solid rgba(0,174,239,.15);
  border-bottom:6px solid rgba(0,174,239,.15);
  border-top:6px solid rgba(0,174,239,.8);
  border-radius:100%;
}

@keyframes rotation {
  from {transform: rotate(0deg);}
  to {transform: rotate(359deg);}
}

</style>
