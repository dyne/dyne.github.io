---
layout: ../../layouts/Layout.astro
title: "Tomb :: File Encryption on GNU/Linux"
description: "Tomb is an 100% free and open source system for file encryption on GNU/Linux. It simply makes gpg dm-crypt and cryptsetup usable in a variety of situations."
---

# Tomb :: File Encryption on GNU/Linux

![](https://www.dyne.org/wp-content/uploads/2011/10/tomb_n_bats.png "tomb_n_bats")

## Take care of the skeletons in your closet!

 

Tomb is an **100% free** and open source system for file encryption on GNU/Linux, facilitating the backup of secret files. Tomb is written in code that is easy to review and links commonly shared components.

Tomb generates encrypted storage folders to be opened and closed using their associated keyfiles, which are also protected with a password chosen by the user.

A tomb is like a locked folder that can be safely transported and hidden in a filesystem; its keys can be kept separate, for instance keeping the tomb file on your computer harddisk and the key files on a USB stick.

Tomb is a simple tool to manage **encrypted storage** on GNU/Linux, from the *hashes* of the [dyne:bolic](http://dynebolic.org/) nesting mechanism.

**Tomb works only on GNU/Linux systems**.

If you are already familiar, [download the tar.gz](https://files.dyne.org/tomb) and jump to the

[Installation instructions](https://github.com/dyne/Tomb/blob/master/INSTALL.md)

 

## How does our file encryption on Linux works

![Tomb logo by monmort](https://www.dyne.org/wp-content/uploads/2011/11/monmort1.png)

Tomb is a simple shell script, you can just download the source\
distribution and copy it in your path, it will check for requirements installed.

Tombs are operated from a terminal commandline and require **root access** to the machine (or just sudo access to the script).

Here is a nice review made by the Linux Action Show guys on August 2014, they recommend it as a replacement of TrueCrypt on GNU/Linux.\
\
Please note that user permission problems are due to the fact they are not using **sudo**. We do recommend using it.

To create a 100MB tomb called “secret” do:

```
tomb dig -s 100 secret.tomb tomb forge secret.tomb.key tomb lock secret.tomb -k secret.tomb.key
```

To open it, do
```
tomb open secret.tomb -k secret.tomb.key
```
and after you are done
```
tomb close
```
or if you are in a hurry
```
tomb slam all
```
will close immediately all open tombs, killing all applications using them. Multiple tombs can be used at the same time, directories and files inside them can be bound to files and directories inside your $HOME, placing all configurations where the applications expect them.

[Manpage (PDF)](http://tomb.dyne.org/tomb_manpage.pdf)

Tomb can do much more, like execution hooks, steganography of keys and fast search over filenames and contents: have a look at the **manpage**.

![awesome-shot](https://www.dyne.org/wp-content/uploads/2011/11/awesome-shot.png)

There are also some graphical user interfaces, mime-type registrations and things to make it easier to use on the desktop, look in **extras/**.

Here below a snapshot of the commandline help (tomb -h):

```man
Tomb 2.10.0 - a strong and gentle undertaker for your secrets

Copyright (C) 2007-2021 Dyne.org Foundation, License GNU GPL v3+
This is free software: you are free to change and redistribute it
For the latest sourcecode go to <http://dyne.org/software/tomb>

Syntax: tomb [options] command [arguments]

Commands:

// Creation:
dig          create a new empty TOMB file of size -s in MiB
forge        create a new KEY file and set its password
lock         installs a lock on a TOMB to use it with KEY

   // Operations on tombs:
	open         open an existing TOMB (-k KEY file or - for stdin)
index        update the search indexes of tombs
search       looks for filenames matching text patterns
list         list of open TOMBs and information on them
ps           list of running processes inside open TOMBs
close        close a specific TOMB (or 'all')
slam         slam a TOMB killing all programs using it
resize       resize a TOMB to a new size -s (can only grow)

// Operations on keys:
passwd       change the password of a KEY (needs old pass)
setkey       change the KEY locking a TOMB (needs old key and pass)

  Options:

-s           size of the tomb file when creating/resizing one (in MiB)
-k           path to the key to be used ('-k -' to read from stdin)
-n           don't launch the execution hooks found in tomb
-p           preserve the ownership of all files in tomb
-o           options passed to commands: open, lock, forge (see man)
-f           force operation (i.e. even if swap is active)
-g           use a GnuPG key to encrypt a tomb key
-r           provide GnuPG recipients (separated by comma)
-R           provide GnuPG hidden recipients (separated by comma)
--sudo       super user exec alternative to sudo (doas or none)

-h           print this help
-v           print version, license and list of available ciphers
-q           run quietly without printing informations
-D           print debugging information at runtime

For more information on Tomb read the manual: man tomb
Please report bugs on <http://github.com/dyne/tomb/issues>.
```

## [![foster\_privacy](https://www.dyne.org/wp-content/uploads/2012/06/foster_privacy.png)](https://www.dyne.org/wp-content/uploads/2012/06/foster_privacy.png)Why should one trust this script?

Good question, which ultimately we shouldn’t answer: it is up to anyone using such a delicate tool to assess its reliability, based on common understanding of code and opinions of trusted peers.

We believe that complexity hides insecurity, therefore Tomb is open source and basically just a script you can read and check for what it does. We do our best to keep it short and easy to read.

[Documentation for code literates](https://github.com/dyne/Tomb/blob/master/tomb)

All dependencies used in Tomb are common GNU/Linux components, well peer reviewed and found in most distributions. Plus there is no cloud service connected and no network connection needed: Tomb works entirely off-line, of course.

## Who needs Tomb

> “*Democracy requires Privacy as much as Freedom of Expression.*” Anonymous

Our target community are desktop users with no time to click around, sometimes using old or borrowed computers, operating in places endangered by conflict where a leak of personal data can be a threat.

If you can’t own a laptop then it’s possible to go around with a USB stick and borrow computers, still leaving no trace and keeping your data safe during transports. Tomb aims to facilitate all this and to be interoperable across popular GNU/Linux operating systems.

The internet offers plenty of free services, on the wave of the Web2.0 fuzz and the community boom, while all private informations are hosted on servers owned by global corporations and monopolies.

> The distinction between what is public and what is private is becoming more and more blurred with the increasing intrusiveness of the media and advances in electronic technology. While this distinction is always the outcome of continuous cultural negotiation, it continues to be critical, for where nothing is private, democracy becomes impossible.

It is important to keep in mind that no-one else better than *you* can ensure the privacy of your personal data. Server hosted services and web integrated technologies gather all data into huge information pools that are made available to established economical and cultural regimes.

**This software urges you to reflect on the importance of your privacy**. World is full of prevarication and political imprisonments, war rages in several places and media is mainly used for propaganda by the powers in charge. Some of us face the dangers of being tracked by oppressors opposing our self definition, independent thinking and resistance to omologation.

## Aren’t there enough encryption tools?

We’ve felt the urgency of publishing Tomb for other operating systems than dyne:bolic since the current situation in personal desktop encryption is far from optimal.

[TrueCrypt](http://en.wikipedia.org/wiki/TrueCrypt) makes use of statically linked libraries so that its code is hard to audit, plus is [not considered free](http://lists.freedesktop.org/archives/distributions/2008-October/000276.html) by operating system distributors because of liability reasons, see [Debian](http://bugs.debian.org/cgi-bin/bugreport.cgi?bug=364034), [Ubuntu](https://bugs.edge.launchpad.net/ubuntu/+bug/109701), [Suse](http://lists.opensuse.org/opensuse-buildservice/2008-10/msg00055.html), [Gentoo](http://bugs.gentoo.org/show_bug.cgi?id=241650) and [Fedora](https://fedoraproject.org/wiki/ForbiddenItems#TrueCrypt).

[EncFS](http://www.arg0.net/encfs) is the best alternative to Tomb out there and its main advantage consists in not needing root access on the machine it’s being used. But still has drawbacks: it implements weaker encryption than dm-crypt and it doesn’t promotes the separated storage of keys.

At last, encrypted home mechanisms on operating systems as Debian and Ubuntu adopt encryption algorithms as strong as Tomb does, but they need to be configured when the machine is installed, they cannot be easily transported and again they don’t promote separated storage of keys.

##### Where do we learn from

Here below some articles that are useful to understand Tomb more in detail and to get in touch with the difficult job of a Crypto Undertaker:

*   [TKS1 – An anti-forensic, two level, and iterated key setup scheme](http://tomb.dyne.org/TKS1-draft.pdf)
*   [New Methods in Hard Disk Encryption](http://tomb.dyne.org/New_methods_in_HD_encryption.pdf)
*   [LUKS On-Disk Format Specification](http://tomb.dyne.org/Luks_on_disk_format.pdf)
*   [Linux hard disk encryption settings](http://tomb.dyne.org/LinuxHDEncSettings.txt)

With Tomb we try to overcome all these limitations providing strong encryption, encouraging users to separate keys from data and letting them transport tombs around easily. Also to facilitate auditing and customization we intend to:

*   write short and readable code, linking shared libs
*   provide easy to use graphical interfaces and desktop integration
*   keep the development process open and distributed using GIT
*   distribute Tomb under the GNU General Public License v3

If you believe this is a worthy effort, you are welcome to [support it](https://www.dyne.org/donate).

# Downloads

Do not use the latest Git version in production environments, but use a stable release versioned and packed as tarball. The stable version will always ensure backward compatibility with older tombs: we make sure it creates sane tombs and keys by running various tests before releasing it. The development version in Git might introduce sudden bugs and is not guaranteed to produce backward- or forward-compatible tombs and keys.

For licensing information see the [GNU General Public License](http://www.gnu.org/copyleft/gpl.html)

## Source package

[Downloads](https://files.dyne.org/tomb)

The latest release is signed by Tomb’s maintainer [Jaromil](http://jaromil.dyne.org).

## Support

Donations are very welcome, see [www.dyne.org/donate](https://dyne.org/donate).

Translations are also needed: they can be contributed via the\
[PO Editor web interface](https://poeditor.com/join/project?hash=33bdefea2e46b26f512a0caae55fbbb5) or simply sending us the .po file. Start from *extras/po/tomb.pot*.

To get in touch with developers join our chat on [irc.dyne.org](https://irc.dyne.org) (SSL over port 9999) on channel #dyne.

## Installation

**Tomb works only on GNU/Linux systems**.

[Installation instructions](https://github.com/dyne/Tomb/blob/master/INSTALL.md)

**Tomb is a single script** and can be installed manually anywhere your path. If you really insist in being a conformist, ‘make install’ will copy it in /usr/local/bin along with its manpage.

Distributions are free to include it as they like, we had an autoconf/automake setup and a debian/ package for apparent ease of installation, but that is now dismissed for yet more simplicity.

Be in charge of your system and **may the source be with you**!

### Windowz

There are rumored plans to port Tomb on Win or at least make it possible to open tomb files under Win: this could be possible especially using [FReeOTFE](http://www.freeotfe.org/) or adding compatibility in [SecureTrayUtil](http://www.sdean12.org/SecureTrayUtil.htm) and contributions are welcome in those directions.

However we strongly **encourage people in need of strong encryption to not use Winslows**, or at least to not generate encrypted partitions with it, since it can contain backdoors in the random number generation, as pointed by Bruce Schneier and Niels Ferguson in this [short essay about the Dual\_EC\_DRBG](http://www.schneier.com/essay-198.html).

![tomb\_songs](https://www.dyne.org/wp-content/uploads/2011/11/tomb_songs.png)

# Compatible applications

Tomb can be used in scripts and some developers out there have built wrappers to facilitate its use with a graphical interface or using different scripting languages.

[zuluCrypt](https://code.google.com/p/zulucrypt/) support opening and closing Tombs, also directly using keys buried in images.

[Tomber](https://github.com/reiven/tomber) is a python wrapper for most functionalities in tomb, making it easy to use inside python applications.

If you know about more tools that should be listed here, please tell us.

# Usage tips…

Tomb can be adapted for ad-hoc use and scripted inside bigger systems of applications, here below a few usage scenarios.

## Private data in daily use

With a simple mount and unmount command, plus the configuration of [bind-hooks](https://github.com/dyne/Tomb/wiki/Advancedfeatures#wiki-Bind_Hooks), your home can change in a snap to include your secrets in the right position for your application paths, like that secret door behind the library you always dreamed of.

## Dangerous information transport

When transporting delicate information the risk of interception is high: even using encryption, if the courier is captured then the key can be found on him or her and the password can be obtained using torture. The solution we propose is that of separating keys from storage, so that a courier alone cannot be the single point of failure. **Never keep your keys where your tomb is**!

## Deniable, but easy to remember, key storage

Steganography helps here. Tomb offers the possibility to **bury** and **exhume** keys from jpeg images: if [steghide](http://steghide.sourceforge.net/) is installed on a system then Tomb will offer this commands in its command-line help.

When securing your private data one of the bigger problems is represented by the fallacy of your memory: in some future you might forget where you left the keys.

This feature lets you keep in mind a certain picture rather than a position in a filesystem, much easy to remember. It also helps in hiding well the key and eventually communicating it without being suspicious, as it is very difficult to detect the presence of a key inside an image without knowing the password you used to seal it.

Another possibility to keep track of keys is to backup them in a physical form: for that we have the command **engrave** which will make a QRCode out of a key which can then be printed, but still must be kept secret, like between the pages of your favourite book or so. To recover an engraved key one can simply scan it with any QR decoder mobile application, save the resulting plain text file and use it as a key in Tomb.

## Keys on different machines

Security can be improved by eliminating the single point of failure, especially if a network connection is available. A tomb can be stored and used on a machine while its keys are far away: they get copied and immediately deleted every time, but never stored on the same machine. Here a little snipped one can use as an alias or a script to trigger the opening of a tomb named “secrets” on the host “desktop” retrieving the keys from a “server.onthe.net”.
```
ssh user\@server.onthe.net 'cat secrets.tomb.key' | tomb open secrets.tomb -k -
```
Ssh is used for the key transport, which can happen also without passwords by using ssh public keys. The tomb option “-k -” tells to take the key from stdin.

## Keys on your mobile phone

A neat setup is that of keeping the tomb on your laptop and the key on your mobile phone, being fairly sure that they are never kept in the same place, pocket or bag. Every time a tomb is open, the mobile activates an “obex ftp daemon” that serves the key over bluetooth to authorized paired devices. A simple script to make that happen follows, substitute the ESSID 11:22:33:44:55:66 with that of your device:
```bash
 mkdir -p /dev/shm/secrets      # prepare to store temporarily the key
 chmod go-rwx /dev/shm/secrets  # in volatile ram
 cd /dev/shm/secrets
 obexftp -b 11:22:33:44:55:66 -g secrets.tomb.key
 tomb open $HOME/secrets.tomb -k secrets.tomb.key
 wipe -f secrets.tomb.key
 cd -
 rmdir /dev/shm/secrets.key
```

## Private cloud storage

Keeping tombs on remote server shells can be a good deterrent to avoid physical break-ins when travelling, not having to carry anything related to your data. To a certain degree, using Tomb also makes it difficult to steal the data from servers, even for providers that have physical access to them.

For server based usage one has to take care of some things: creating a tomb key is usually very slow on a remote server or VPS, the best is to **create the key (forge) locally on your desktop** and then upload it. The second issue is that often one will forget a tomb open and just log out: to avoid this ZShell users can simply put a ‘tomb close’ or ‘tomb slam’ into their \~/.zlogout.

Last but not least, it is also possible to mount tombs locally in a way that the remote server will never have anything to do with the clear data contained into them. This is achieved using **sshfs**:

```
sshfs -o allow_root user@remote.host:/ /local/mountpoint/
tomb open /local/mountpoint/yourthings.tomb -k /path/to/key
```

Please note the sshfs command needs the option ‘-o allow\_root’ because otherwise root will not have permissions to read in the remote filesystem.

If you like to go more in detail, [this MA thesis](http://ur1.ca/6da8l) in computer science mentions the successful usage of Tomb over cloud filesystem storage and possible new horizons for its development.

## More tips…

More interesting usage tips can be found in our [Wiki documentation](https://github.com/dyne/Tomb/wiki) and in crunchbang’s [Paranoid #! Security guide](http://crunchbang.org/forums/viewtopic.php?id=24722) (great distro BTW!)

[![github\_tomb](https://www.dyne.org/wp-content/uploads/2011/11/github_tomb.jpg)](https://github.com/dyne/Tomb)

# Development

Tomb is being developed using GIT and its [main repository is hosted on GitHub](https://github.com/dyne/Tomb).

Developers are welcome to interact with us via issues, pull requests or directly on the **crypto mailinglist** on [lists.dyne.org](https://lists.dyne.org).

Also make sure to read the [short tomb tester howto](https://github.com/dyne/Tomb/wiki/TesterHowTo) to have some directions on how to do troubleshooting. If you plan to write code then the [short tomb developer howto](https://github.com/dyne/Tomb/wiki/DeveloperHowto) is for you.

To get in touch with us you can also join our chat on [irc.dyne.org](https://irc.dyne.org) (SSL over port 9999) on channel #dyne and #tomb – or even better, participate in person to one of the yearly [italian hackmeeting](http://hackmeeting.org), usually held during summer on the peninsula.

## Stage of development

At present time Tomb is easy to install and use, it mainly consists of a Shell script and some auxiliary C code for desktop integration (GTK), a Python GUI that makes use of the new –batch mode.

You are welcome to join especially to help to enhance compatibility across operating systems, distribution packaging, GUI integration, translation and documentation. The golden rule for us is: write short code and make it readable. Transparency and ease of code review is one of the strong points for an encryption tool we all intend to rely on.

[![](https://www.dyne.org/wp-content/uploads/2011/10/tomb_crew_hkm11.jpg "tomb_crew_hkm11")](https://www.dyne.org/wp-content/uploads/2011/10/tomb_crew_hkm11.jpg)

A cheerful picture of Tomb developers crew at Hackmeeting 2011 in Firenze

## People involved

Tomb is originally designed and written by [Jaromil](http://jaromil.dyne.org), it includes code by Hellekin O. Wolf, Anathema and Boyska, its artwork is contributed by [Món Mort](http://monmort.blogspot.com/).

Testing, reviews and documentation are contributed by Dreamer, Shining the Translucent, [Mancausoft](http://www.mancausoft.org/), [Asbesto Molesto](http://zaverio.org) and Nignux.

Most research we refer to is documented by Clemens Fruhwirth who also developed Cryptsetup together with Christophe Saout.

> All I know is what the words know, and dead things, and that makes a handsome little sum, with a beginning and a middle and an end, as in the well-built phrase and the long sonata of the dead.

&mdash; <cite>Samuel Beckett</cite>

<!-- .entry-content -->

