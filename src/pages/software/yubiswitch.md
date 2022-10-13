---
layout: ../../layouts/Layout.astro
title: "Yubiswitch :: OSX status bar app to quickly enable/disable a Yubikey Nano"
description: ""
---

# Yubiswitch :: OSX status bar app to quickly enable/disable a Yubikey Nano

\`yubiswitch\` is an OSX status bar application to enable/disable a [Yubikey Nano](http://www.yubico.com/products/yubikey-hardware/yubikey-nano) from Yubico. Yubikey is the producer of the Yubikeys: an hardware authentication device, designed to provide an easy to use and secure compliment to the traditional username and password. By touching the exposed gold edge, a YubiKey Nano emits a One Time Password (OTP) as if it was typed in from a keyboard. The unique passcode is verified by a YubiKey compliant application.\
[![Yubikey Nano picture](https://www.dyne.org/wp-content/uploads/2013/09/nano.jpg)](https://www.dyne.org/wp-content/uploads/2013/09/nano.jpg)

So far all looks great doesn’t it? 😀

    flnurfrdjvfrlutthjtjvcbcrlbbnnuu

<!---->

    ejehlrlrclcllukjgehhrttbknnbjdfn

<!---->

    njlvvnherbjvnljdvvvnihrfikufjucr

<!---->

    jhgkhrubrnuchhhbhrugvbenrhkcvich

Whooops! You see? I brought my laptop (lid opened) with me for a walk to a meeting room holding it with my right hand right touching the golden stripe and this caused the Nano to start sending random OTP passwords to my Vim session, and to the FB chat window I had opened with my wife, and right now she’s been asking WTF I’ve been writing 😛

This status bar app avoids you to send those accidental OTP passwords by allowing you to enable or disable the yubikey using a convenient global keyboard hot key that you can configure yourself.

# Download

[Download latest DMG from github](https://github.com/pallotron/yubiswitch/releases/)

# Screenshots

Menu items as they show in the OSX status bar:

![screenshot-menuitems](https://www.dyne.org/wp-content/uploads/2013/09/screenshot-menuitems-300x141.png)

The preference window where you can set your global hotkey and the device VendorID/ProductID:

![screenshot-prefs](https://www.dyne.org/wp-content/uploads/2013/09/screenshot-prefs-300x110.png)

 

#  Known issues

*    This applicaiton only works with a single model of yubikey, the **\*YubiKey Nano\***. There is no need to deal with other yubikeys because their form factor doesn’t encourage the users to leave it always plugged in. The nano is the only the model that fits cleanly into your usb port. It has idVendor *0x1050* and idProduct *0x0010*.
*   This app only works with recent version of OSX because it relies on the Notification Centre. OSX 10.8.x and above would do it. Sorry about that

# Future plans and TODO

[TODO and wishlist](#)

 

# Author

Angelo “pallotron” Failla

*   Github homepage:[ http://pallotron.github.io/](< http://pallotron.github.io/>)
*   Website: <http://www.pallotron.net>
*   Blog:[ http://blog.angelofailla.com](< http://blog.angelofailla.com>)
*   Facebook page:[ https://www.facebook.com/pallotron/](< https://www.facebook.com/pallotron/>)

# Credits

Credits to [Anton Tolchanov (@knyar)](https://github.com/knyar), he originally wrote this in Python using PyObjC bridge. I decided to port this into Objective-C to learn the language when I found out that Carbon Event Manager libs have been removed from Python3. See htt[p://docs.python.org/2/library/carbon.html](http://docs.python.org/2/library/carbon.html)

