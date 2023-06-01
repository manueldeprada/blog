---
title: Cambiando el Sercomm H500-s de Vodafone por un router neutro con OpenWrt
tags:
  - vodafone
  - h500s
  - usuario
  - router
author: Manuel de Prada Corral
date: 2020-10-06
---

Breve resumen de mi experiencia cambiando el router Sercomm H500-s de Vodafone por un router neutro con OpenWrt, explicando los problemas para obtener las credenciales PPPoE y cómo solucionarlos.

<!-- more -->

En mi caso dispongo de este router de Vodafone conectado a un ONT Lucent. Soy usuario de fibra directa, no NEBA. El Sercomm tiene la última versión de firmware a septiembre de 2020, la 3.5.09.

Como ya sabrás, para obtener el nombre de usuario y contraseña de este router para realizar la conexión PPPoE hay que escuchar entre el router y el ONT y capturar el tráfico. La mayoría de tutoriales, ([este](https://bandaancha.eu/articulos/conseguir-admin-router-sercomm-h500-s-9602/2) para mi es de referencia)  acceden al router como admin para forzar redirigir todo el tráfico entre el ONT y el router a la interfaz del PC, y así poder escuchar el tráfico con Wireshark. 

No digo que esto no funciona, pero yo no fui capaz de capturar nada. Sospecho que el router hace la telecarga antes de descargar los datos PPPoE y en cuanto detecta a un admin conectado, te echa, cierra la redirección de paquetes y entonces pide las credenciales PPPoE al servidor. Pero repito, puede que yo sea un manazas y esto siga funcionando.



Para asegurarme de capturar los datos, recurrí al siguiente método: conecté el ONT a mi ordenador. Luego mi ordenador lo conecté también por ethernet al router, utilizando un adaptador USB a ethernet (los hay en amazon por 10€). De esta forma mi ordenador estaba en medio del router y el ONT. Para que esta conexión con el ordenador en medio se haga efectiva, hay que configurar las dos interfaces ethernet en modo puente. En Windows no fui capaz de configurar el modo puente y que el router y el ONT se descubrieran mutuamente (Windows!!!!) pero usando Linux no hubo problema sin más que seguir [estas instrucciones](https://unix.stackexchange.com/questions/255484/how-can-i-bridge-two-interfaces-with-ip-iproute2). Solo falta resetear el router y capturar los datos utilizando Wireshark.

Ahí obtuve mi usuario de PPPoE para vodafone sin ningún problemas, como en el resto de guías.

Ahora bien, para configurar el router neutro contra la ONT, no basta con proporcionar el user y pass de la conexión PPPoE en la configuración WAN del router. Además, se debe configurar el router para que todo el tráfico saliente hacia la WAN sea etiquetado como VLAN 100. Esto en OpenWRT se puede conseguir desde la interfaz LuCi sin más que acceder al apartado Network -> Switch. 

Si tienes un Linksys EA8300 o cualquier otro router con el switch híbrido IPQ40xx, aún tendrás que bucear un poco por la red para configurar manualmente el switch pese a los bugs del driver.

