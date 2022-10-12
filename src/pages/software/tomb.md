<!-- This site is optimized with the Yoast SEO plugin v17.7 - https://yoast.com/wordpress/plugins/seo/ -->

<!-- / Yoast SEO plugin. -->

<!-- This site uses the Google Analytics by ExactMetrics plugin v7.3.0 - Using Analytics tracking - https://www.exactmetrics.com/ -->

<!-- / Google Analytics by ExactMetrics -->

<!-- Open Graph Meta Data by WP-Open-Graph plugin-->

<!-- /Open Graph Meta Data -->

[![dyne.org](https://www.dyne.org/wp-content/uploads/2011/09/moebius-band.png)](https://www.dyne.org/)

*   [Think]()
*   [\&Do]()
*   [Tank]()
*   [■]()

Select Page

<!-- #et-top-navigation -->

<!-- .container -->

Search …

<!-- #main-header -->

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

|                                                                                                     |
| --------------------------------------------------------------------------------------------------- |
|     tomb dig -s 100 secret.tomb tomb forge secret.tomb.key tomb lock secret.tomb -k secret.tomb.key |

tomb dig -s 100 secret.tomb tomb forge secret.tomb.key tomb lock secret.tomb -k secret.tomb.key

To open it, do

|                                              |
| -------------------------------------------- |
|     tomb open secret.tomb -k secret.tomb.key |

tomb open secret.tomb -k secret.tomb.key

and after you are done

|                |
| -------------- |
|     tomb close |

tomb close

or if you are in a hurry

|                   |
| ----------------- |
|     tomb slam all |

tomb slam all

will close immediately all open tombs, killing all applications using them. Multiple tombs can be used at the same time, directories and files inside them can be bound to files and directories inside your $HOME, placing all configurations where the applications expect them.

[Manpage (PDF)](http://tomb.dyne.org/tomb_manpage.pdf)

Tomb can do much more, like execution hooks, steganography of keys and fast search over filenames and contents: have a look at the **manpage**.

![awesome-shot](https://www.dyne.org/wp-content/uploads/2011/11/awesome-shot.png)

There are also some graphical user interfaces, mime-type registrations and things to make it easier to use on the desktop, look in **extras/**.

Here below a snapshot of the commandline help (tomb -h):

|                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|     Syntax: tomb [options] command [arguments]   Commands:    // Creation:  dig     create a new empty TOMB file of size -s in MB  forge   create a new KEY file and set its password  lock    installs a lock on a TOMB to use it with KEY    // Operations on tombs:  open    open an existing TOMB  index   update the search indexes of tombs  search  looks for filenames matching text patterns  list    list of open TOMBs and information on them  close   close a specific TOMB (or 'all')  slam    slam a TOMB killing all programs using it  resize  resize a TOMB to a new size -s (can only grow)    // Operations on keys:  passwd  change the password of a KEY  setkey  change the KEY locking a TOMB (needs old one)  engrave makes a QR code of a KEY to be saved on paper  bury    hide a KEY inside a JPEG image  exhume  extract a KEY from a JPEG image   Options:    -s     size of the tomb file when creating/resizing one (in MB)  -k     path to the key to be used ('-k -' to read from stdin)  -n     do not process the hooks found in tomb  -o     mount options used to open (default: rw,noatime,nodev)  -f     force operation (i.e. even if swap is active)  --kdf  generate passwords armored against dictionary attacks    -h     print this help  -v     print version, license and list of available ciphers  -q     run quietly without printing informations  -D     print debugging information at runtime   For more informations on Tomb read the manual: man tomb |

Syntax: tomb \[options] command \[arguments] Commands: // Creation: dig create a new empty TOMB file of size -s in MB forge create a new KEY file and set its password lock installs a lock on a TOMB to use it with KEY // Operations on tombs: open open an existing TOMB index update the search indexes of tombs search looks for filenames matching text patterns list list of open TOMBs and information on them close close a specific TOMB (or 'all') slam slam a TOMB killing all programs using it resize resize a TOMB to a new size -s (can only grow) // Operations on keys: passwd change the password of a KEY setkey change the KEY locking a TOMB (needs old one) engrave makes a QR code of a KEY to be saved on paper bury hide a KEY inside a JPEG image exhume extract a KEY from a JPEG image Options: -s size of the tomb file when creating/resizing one (in MB) -k path to the key to be used ('-k -' to read from stdin) -n do not process the hooks found in tomb -o mount options used to open (default: rw,noatime,nodev) -f force operation (i.e. even if swap is active) --kdf generate passwords armored against dictionary attacks -h print this help -v print version, license and list of available ciphers -q run quietly without printing informations -D print debugging information at runtime For more informations on Tomb read the manual: man tomb

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

> “The distinction between what is public and what is private is becoming more and more blurred with the increasing intrusiveness of the media and advances in electronic technology. While this distinction is always the outcome of continuous cultural negotiation, it continues to be critical, for where nothing is private, democracy becomes impossible.”\
> (from [Privacy Conference, Social Research, New School University](http://www.newschool.edu/centers/socres/privacy/Home.html))

It is important to keep in mind that no-one else better than *you* can ensure the privacy of your personal data. Server hosted services and web integrated technologies gather all data into huge information pools that are made available to established economical and cultural regimes.

**This software urges you to reflect on the importance of your privacy**. World is full of prevarication and political imprisonments, war rages in several places and media is mainly used for propaganda by the powers in charge. Some of us face the dangers of being tracked by oppressors opposing our self definition, independent thinking and resistance to omologation.

## Aren’t there enough encryption tools?

We’ve felt the urgency of publishing Tomb for other operating systems than dyne:bolic since the current situation in personal desktop encryption is far from optimal.

[TrueCrypt](http://en.wikipedia.org/wiki/TrueCrypt) makes use of statically linked libraries so that its code is hard to audit, plus is [not considered free](http://lists.freedesktop.org/archives/distributions/2008-October/000276.html) by operating system distributors because of liability reasons, see [Debian](http://bugs.debian.org/cgi-bin/bugreport.cgi?bug=364034), [Ubuntu](https://bugs.edge.launchpad.net/ubuntu/+bug/109701), [Suse](http://lists.opensuse.org/opensuse-buildservice/2008-10/msg00055.html), [Gentoo](http://bugs.gentoo.org/show_bug.cgi?id=241650) and [Fedora](https://fedoraproject.org/wiki/ForbiddenItems#TrueCrypt).

[Cryptkeeper](http://tom.noflag.org.uk/cryptkeeper.html) is the best alternative to Tomb out there and its main advantage consists in not needing root access on the machine it’s being used. But Cryptkeeper still has drawbacks: it uses [EncFS](http://www.arg0.net/encfs) which implements weaker encryption than dm-crypt and it doesn’t promotes the separated storage of keys.

At last, the [Encrypted home](https://we.riseup.net/debian/automatically-mount-encrypted-home) mechanisms on operating systems as Debian and Ubuntu adopt encryption algorithms as strong as Tomb does, but they need to be configured when the machine is installed, they cannot be easily transported and again they don’t promote separated storage of keys.

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

|                                                                                    |
| ---------------------------------------------------------------------------------- |
|     ssh user@server.onthe.net 'cat secrets.tomb.key' | tomb open secrets.tomb -k - |

ssh user\@server.onthe.net 'cat secrets.tomb.key' | tomb open secrets.tomb -k -

Ssh is used for the key transport, which can happen also without passwords by using ssh public keys. The tomb option “-k -” tells to take the key from stdin.

## Keys on your mobile phone

A neat setup is that of keeping the tomb on your laptop and the key on your mobile phone, being fairly sure that they are never kept in the same place, pocket or bag. Every time a tomb is open, the mobile activates an “obex ftp daemon” that serves the key over bluetooth to authorized paired devices. A simple script to make that happen follows, substitute the ESSID 11:22:33:44:55:66 with that of your device:

|                                                                                                                                                                                                                                                                                                                   |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|      mkdir -p /dev/shm/secrets      # prepare to store temporarily the key  chmod go-rwx /dev/shm/secrets  # in volatile ram  cd /dev/shm/secrets  obexftp -b 11:22:33:44:55:66 -g secrets.tomb.key  tomb open $HOME/secrets.tomb -k secrets.tomb.key  wipe -f secrets.tomb.key  cd -  rmdir /dev/shm/secrets.key |

mkdir -p /dev/shm/secrets # prepare to store temporarily the key chmod go-rwx /dev/shm/secrets # in volatile ram cd /dev/shm/secrets obexftp -b 11:22:33:44:55:66 -g secrets.tomb.key tomb open $HOME/secrets.tomb -k secrets.tomb.key wipe -f secrets.tomb.key cd - rmdir /dev/shm/secrets.key

## Private cloud storage

Keeping tombs on remote server shells can be a good deterrent to avoid physical break-ins when travelling, not having to carry anything related to your data. To a certain degree, using Tomb also makes it difficult to steal the data from servers, even for providers that have physical access to them.

For server based usage one has to take care of some things: creating a tomb key is usually very slow on a remote server or VPS, the best is to **create the key (forge) locally on your desktop** and then upload it. The second issue is that often one will forget a tomb open and just log out: to avoid this ZShell users can simply put a ‘tomb close’ or ‘tomb slam’ into their \~/.zlogout.

Last but not least, it is also possible to mount tombs locally in a way that the remote server will never have anything to do with the clear data contained into them. This is achieved using **sshfs**:

|                                                                                                                           |
| ------------------------------------------------------------------------------------------------------------------------- |
|     sshfs -o allow_root user@remote.host:/ /local/mountpoint/ tomb open /local/mountpoint/yourthings.tomb -k /path/to/key |

sshfs -o allow\_root user\@remote.host:/ /local/mountpoint/ tomb open /local/mountpoint/yourthings.tomb -k /path/to/key

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

> “*All I know is what the words know, and dead things, and that makes a handsome little sum, with a beginning and a middle and an end, as in the well-built phrase and the long sonata of the dead.*” Samuel Beckett

<!-- .entry-content -->

<!-- You can start editing here. -->

### Trackbacks/Pingbacks

1.  [Come crearsi il proprio Cloud cifrato con Tomb e SSHFS | V3\_labs](http://www.v3-labs.info/2012/02/03/come-crearsi-il-proprio-cloud-cifrato-con-tomb-e-sshfs/) - \[...] https\://www\.dyne.org/software/tomb/ Ti potrebbe interessare anche:Tomb – Crypto UndertakerStar wars via telnetiPhone TrackerTwitter It! Posted on 3 febbraio 2012 by…
2.  <!-- #comment-## -->
3.  [Como una tumba: Tomb « mutanger](http://mutangerlab.wordpress.com/2012/02/25/como-una-tumba-tomb/) - \[...] Tomb pretende ser un sistema 100% libre y abierto para el cifrado y generar copias de seguridad de archivos…
4.  <!-- #comment-## -->
5.  [Installing and Using Tomb in Ubuntu 11.10 | Focus Determines Reality](http://blog.yawnbox.com/a/595) - \[...] website: https\://www\.dyne.org/software/tomb/ Tomb on Github: \[...]
6.  <!-- #comment-## -->
7.  [Installing and Using Tomb in Ubuntu 11.10 « Focus Determines Reality](http://yawnbox.wordpress.com/2012/02/24/installing-and-using-tomb-in-ubuntu-11-10/) - \[...] website: https\://www\.dyne.org/software/tomb/ Tomb on Github: \[...]
8.  <!-- #comment-## -->
9.  [Encripta tus archivos con Tomb – Linux | mac-abro.com](http://mac-abro.com/2012/05/encripta-tus-archivos-con-tomb-linux/rockdrigo/) - \[...] este post quiero presentarles a Tomb, el sepulturero criptográfico. Tomb es una aplicación 100% libre desarrollada por Jaromil quien…
10. <!-- #comment-## -->
11. [Le chiffrement était dans la Tomb | Korben](http://korben.info/le-chiffrement-etait-dans-la-tomb.html) - \[...] Pour vous procurer Tomb et apprendre à vous en servir, je vous invite à jeter un oeil au site.…
12. <!-- #comment-## -->
13. [Le chiffrement était dans la Tomb | - Dépannage Informatique PC à domicile Limoges haute vienne 87- Dépannage Informatique PC à domicile Limoges haute vienne 87](http://numeric-service.net/numeric-service-actualites/le-chiffrement-etait-dans-la-tomb/) - \[...] Pour vous procurer Tomb et apprendre à vous en servir, je vous invite à jeter un oeil au site.…
14. <!-- #comment-## -->
15. [Le chiffrement était dans la Tomb « Mes idées HIGH TECH](http://www.mesideeshightech.com/?p=347) - \[...] Pour vous procurer Tomb et apprendre à vous en servir, je vous invite à jeter un oeil au site.…
16. <!-- #comment-## -->
17. [Κρυπτογράφηση αρχείων | Satellite-Iptv-Hacking & Security News](http://blackc0der.org/?p=1220) - \[…] Tomb \[4] είναι ένα 100% ελεύθερο και ανοικτού κώδικα σύστημα για \[…]
18. <!-- #comment-## -->
19. [Des alternatives libres à TrueCrypt « Mes idées HIGH TECH](http://www.mesideeshightech.com/?p=1489) - \[…] Il s’agit d’outils COMPATIBLES avec TrueCrypt uniquement. Si vous vous moquez de la compatibilité et que vous souhaitez découvrir…
20. <!-- #comment-## -->
21. [Des alternatives libres à TrueCrypt | L'actualité de la High Tech](http://hitech.infosreg.fr/des-alternatives-libres-a-truecrypt/) - \[…] Il s’agit d’outils COMPATIBLES avec TrueCrypt uniquement. Si vous vous moquez de la compatibilité et que vous souhaitez découvrir…
22. <!-- #comment-## -->
23. [Truecrypt has left the building | CryTo](https://cryto.org/truecrypt-has-left-the-building/) - \[…] grugq einige Alternative zu Truecrypt. Hier verweist auf das bewährte dm-crypt, das neue tomb und tc-play. Seit 2008 existiert…
24. <!-- #comment-## -->
25. [10 alternativ till Truecrypt | Kryptering](https://kryptera.se/10-alternativ-till-truecrypt/) - \[…] Tomb (ej fde) \[…]
26. <!-- #comment-## -->
27. [#40 – about:livelivesendung | about:radio](http://aboutradio.org/40-aboutlivelivesendung/) - \[…] \*tc-play: https\://github.com/bwalex/tc-play \*tomb: https\://www\.dyne.org/software/tomb/ \*Mikrosoft so: Bitte hakt nicht für XP support: \[…]
28. <!-- #comment-## -->
29. [P2P Foundation » Blog Archive » Alternative to Truecrypt](http://blog.p2pfoundation.net/alternative-to-truecrypt/2014/06/03) - \[…] software must be presumed to be insecure as the code cannot be audited. One option might be Tomb, written…
30. <!-- #comment-## -->
31. [TrueCrypt is insecure. | Baird Castleberry](http://bairdcastleberry.com/blog/truecrypt-is-insecure/) - \[…] I recommend learning how to use Tomb. \[…]
32. <!-- #comment-## -->
33. [Bonus: T is for terminated | Inconsolation](http://inconsolation.wordpress.com/2014/06/13/bonus-t-is-for-terminated/) - \[…] tomb: File encryption a la TrueCrypt, I believe. Not in Debian. AUR version is some kind of split PKGBUILD.…
34. <!-- #comment-## -->
35. [Truecrypt alternative called Tomb | n1tr0g3n hacking tutorials](http://www.n1tr0g3n.com/?p=5897) - \[…] Official Site:  HERE \[…]
36. <!-- #comment-## -->
37. [El fin de TrueCrypt | La Ascurria es Gratis](http://la.ascurria.es/gratis/482/el-fin-de-truecrypt/) - \[…] OS X y cualquier cosa que diga “encryption” y “crypt” en GNU/Linux (como Tomb o \[…]
38. <!-- #comment-## -->
39. [Cifrado Tomb: entierra tus secretos en Linux](http://bitelia.com/2014/09/cifrado-tomb-linux) - \[…] ello vamos a usar Tomb, un sistema libre y de código abierto para el cifrado de nuestros archivos que…
40. <!-- #comment-## -->
41. [Entierra tus secretos en Linux usando Tomb | www.cyanogenmod.info](http://www.cyanogenmod.info/2014/09/entierra-tus-secretos-en-linux-usando-tomb/) - \[…] ello vamos a usar Tomb, un sistema libre y de código abierto para el cifrado de nuestros archivos que…
42. <!-- #comment-## -->
43. [Entierra tus secretos en Linux usando Tomb | Misiongeek](http://misiongeek.com/2014/09/entierra-tus-secretos-en-linux-usando-tomb/) - \[…] ello vamos a usar Tomb, un sistema libre y de código abierto para el cifrado de nuestros archivos que…
44. <!-- #comment-## -->
45. [Entierra tus secretos en Linux usando Tomb | SUNETFON](http://www.sunetfon.com/?p=35819) - \[…] ello vamos a usar Tomb, un sistema libre y de código abierto para el cifrado de nuestros archivos que…
46. <!-- #comment-## -->
47. [How to keep your sexy selfies (and other sensitive files) safe in the cloud – Health and Fitness](http://www.asiahealthnews.com/2014/09/04/how-to-keep-your-sexy-selfies-and-other-sensitive-files-safe-in-the-cloud/) - \[…] of TrueCrypt: the ability to create encrypted containers for sets of files (Linux users can use Tomb to do…
48. <!-- #comment-## -->
49. [Cómo mantener tus archivos importantes seguros en la nube - Cloud Computing, CÓMO HACERLO, Seguridad - CIO América Latina](http://www.cioal.com/2014/09/16/como-mantener-tus-archivos-importantes-seguros-en-la-nube/) - \[…] de crear contenedores codificados para sets de archivos (los usuarios de Linux pueden emplear Tomb para \[…]
50. <!-- #comment-## -->
51. [Cómo mantener tus archivos importantes seguros en la nube - CIOAL The Standard IT](http://cioal.thestandardit.gpcinc.mx/2014/09/17/como-mantener-tus-archivos-importantes-seguros-en-la-nube/) - \[…] de crear contenedores codificados para sets de archivos (los usuarios de Linux pueden emplear Tomb para \[…]
52. <!-- #comment-## -->
53. [Cómo evitar hackeos y mantener tus archivos importantes seguros en la nube - CIOAL The Standard IT](http://www.cioal.com/2014/09/17/como-mantener-tus-archivos-importantes-seguros-en-la-nube/) - \[…] de crear contenedores codificados para sets de archivos (los usuarios de Linux pueden emplear Tomb para \[…]
54. <!-- #comment-## -->
55. [Do not use anymore TrueCrypt | Mario's Blog](http://www.mariosebastiani.eu/2014/10/16/do-not-use-anymore-truecrypt/) - \[…] With this in mind, I strongly encourage you to find alternatives to TrueCrypt. For Linux systems I’m looking at…
56. <!-- #comment-## -->
57. [Tomb :: File Encryption on Linux | d@n3n | Sco...](http://www.scoop.it/t/d-n3n/p/4032100620/2014/11/20/tomb-file-encryption-on-linux) - \[…] Tomb is an 100% free and open source system for file encryption on Linux. It simply makes dm-crypt and…
58. <!-- #comment-## -->
59. [ENCFS le chiffrement adapté au Cloud | Linked](http://egautier.net/site/encfs-le-chiffrement-adapte-au-cloud/) - \[…] plus cependant d’autres alternatives existent, l’une plébiscité en ce moment serait Tomb sous Linux . Sous Windows une alternative…
60. <!-- #comment-## -->
61. [Manda Nudes - Guia Sensual de Segurança Digital](http://www.crimespelainternet.com.br/manda-nudes-guia-sensual-de-seguranca-digital/) - \[…] você está no Linux, o Tomb te deixa escolher as pastas e arquivos que serão criptografados, mas não garante…
62. <!-- #comment-## -->
63. [MacTomb: enhance your privacy on Mac OS X | Lost in ICT](https://lostinict.wordpress.com/2015/09/27/mactomb-enhance-your-privacy-on-mac-os-x/) - \[…] you’re using a GNU/Linux distro, you can check out Tomb and some useful scripts to run software on a…
64. <!-- #comment-## -->
65. [..:: Los muertos no hablan :: Tomb en Linux ::.. |](http://allstation.serveblog.net/page/index.php/2015/10/23/los-muertos-no-hablan-tomb-en-linux/) - \[…] Tomb, un sistema libre y de código abierto para el cifrado de nuestros archivos que usa tecnologías que contiene…
66. <!-- #comment-## -->
67. [ENCFS le chiffrement adapté au Cloud | Blog](http://www.gautier.it/2014/11/24/encfs-le-chiffrement-adapte-au-cloud/) - \[…] d’autres alternatives existent, l’une plébiscité en ce moment serait Tomb sous Linux . Sous Windows une alternative est \[…]
68. <!-- #comment-## -->
69. [Jaromil - STAFF\_ ROOM](http://staffroom.nl/jaromil_roio/) - \[…] Tomb is an 100% free and open source system for file encryption on GNU/Linux, facilitating the backup of secret files. Tomb…
70. <!-- #comment-## -->
71. [Tomb and Linux – Web Security Training](http://securitytraning.com/tomb-and-linux/) - \[…] to help us encrypt and decrypt personal files. The folks over at Dyne created a shell script called Tomb.…
72. <!-- #comment-## -->
73. [ENCFS le chiffrement adapté au Cloud - Blog](http://blog.gautier.it/2014/11/24/encfs-le-chiffrement-adapte-au-cloud/) - \[…] d’autres alternatives existent, l’une plébiscité en ce moment serait Tomb sous Linux . Sous Windows une alternative est \[…]
74. <!-- #comment-## -->
75. [Tomb is an Alternative to Truecrypt Tailored Especially for Linux Systems](http://news.tecmint.com/tomb-is-a-command-line-based-alternative-to-truecrypt/) - \[…] Furthermore, Tomb does feature more than a few benefits that include varying use cases as well the ability to…
76. <!-- #comment-## -->
77. [Usando Tomb para cifrado de datos en Linux | Alberto Méndez Cabrera](https://alberto.mendezcabrera.com/usando-tomb-para-cifrado-de-datos-en-linux/) - \[…] vengo a hablar de Tomb, un sistema de cifrado 100% gratis y libre. Ya hace tiempo estuve buscando una…
78. <!-- #comment-## -->
79. [3 encryption tools for Linux that will keep your data safe – PCWorld](http://tipats.com/3-encryption-tools-for-linux-that-will-keep-your-data-safe-pcworld/) - \[…] Finally, there’s a tool called Tomb. Tomb is little more than a script, but it makes creating and managing…
80. <!-- #comment-## -->
81. [3 encryption tools for Linux that will keep your data safe – Computer Repair Hopkins, Minnesota](http://computerrepairhopkinsmn.com/2016/11/14/3-encryption-tools-for-linux-that-will-keep-your-data-safe/) - \[…] Finally, there’s a tool called Tomb. Tomb is little more than a script, but it makes creating and managing…
82. <!-- #comment-## -->
83. [3 encryption tools for Linux that will keep your data safe – Wayzata Computer Repair](http://wayzatacomputerrepair.com/2016/11/14/3-encryption-tools-for-linux-that-will-keep-your-data-safe/) - \[…] Finally, there’s a tool called Tomb. Tomb is little more than a script, but it makes creating and managing…
84. <!-- #comment-## -->
85. [3 encryption tools for Linux that will keep your data safe – PCWorld | The Perfect Computer Mall](http://perfectcomputermall.com/3-encryption-tools-for-linux-that-will-keep-your-data-safe-pcworld/) - \[…] Finally, there’s a tool called Tomb. Tomb is little more than a script, but it makes creating and managing…
86. <!-- #comment-## -->
87. [3 encryption tools for Linux that will keep your data safe – PCWorld | Deals to find](http://dealstofind.com/blog/computers/3-encryption-tools-for-linux-that-will-keep-your-data-safe-pcworld/) - \[…] Finally, there’s a tool called Tomb. Tomb is little more than a script, but it makes creating and managing…
88. <!-- #comment-## -->
89. [3 encryption tools for Linux that will keep your data safe – Computer Repair Plymouth](http://computerrepairplymouthmn.com/2016/11/14/3-encryption-tools-for-linux-that-will-keep-your-data-safe/) - \[…] Finally, there’s a tool called Tomb. Tomb is little more than a script, but it makes creating and managing…
90. <!-- #comment-## -->
91. [3 encryption tools for Linux that will keep your data safe](http://www.howcanvideo.com/tutorial/3-encryption-tools-for-linux-that-will-keep-your-data-safe/) - \[…] Finally, there’s a tool called Tomb. Tomb is little more than a script, but it makes creating and managing…
92. <!-- #comment-## -->
93. [Dyne @ CCC Camp | D.TV](http://deptford.tv/blog/?p=1420) - \[…] This year Dyne presented Devuan @ the CCC camp. Also see how to take care of skeletons in your…
94. <!-- #comment-## -->
95. [Eine Sammlung von TrueCrypt Alternativen – hanseflow Hamburg](http://hanseflow.de/truecrypt-alternative/) - \[…] Tomb :: The Crypto Undertaker \[…]
96. <!-- #comment-## -->
97. [4 cool new projects to try in COPR for November - Fedora Magazine](https://fedoramagazine.org/4-cool-new-projects-try-copr-3/) - \[…] Tomb is a simple command-line tool for managing encrypted filesystems. It consists of a shell script that uses cryptsetup and LUKS…
98. <!-- #comment-## -->
99. [4 cool new projects to try in COPR for November | Fedora Colombia](http://fedoracolombia.org/wp/2017/11/03/4-cool-new-projects-to-try-in-copr-for-november/) - \[…] Tomb is a simple command-line tool for managing encrypted filesystems. It consists of a shell script that uses cryptsetup and LUKS…
100.    <!-- #comment-## -->
101.    [How to Encrypt Files with Tomb on Ubuntu 16.04 LTS | Techlear](http://www.techlear.com/2018/01/25/how-to-encrypt-files-with-tomb-on-ubuntu-16-04-lts/) - \[…] also uses a similar encryption standard to Veracrypt, AES-256. This standard is Applied by everyone from the NSA to…
102.    <!-- #comment-## -->
103.    [How to encrypt files on a Ubuntu server with Tomb | DataField](https://www.datafieldusa.com/2018/02/08/encrypt-files-ubuntu-server-tomb/) - \[…] Tomb is a free and open source tool used to generate encrypted storage vaults to be opened and closed using…
104.    <!-- #comment-## -->
105.    [用 Tomb 加密文件 – My Blog](https://www.pes2018.club/blog/2018/02/23/%e7%94%a8-tomb-%e5%8a%a0%e5%af%86%e6%96%87%e4%bb%b6/) - \[…] Veracrypt 类似的 AES-256 加密标准。这个标准适用于 NSA 、微软和 \[…]
106.    <!-- #comment-## -->
107.    [Выпуск легковесного дистрибутива antiX 17.4](https://rebeltech.ru/Vypusk-legkovesnogo-distributiva-antix-17-4/) - \[…] и тему оформления. В состав включено приложение tomb для шифрования \[…]
108.    <!-- #comment-## -->
109.    [8 Best File And Disk Encryption Tools For Linux | Itsubuntu.com](https://itsubuntu.com/best-file-disk-encryption-tools-for-linux/) - \[…] Download Tomb \[…]
110.    <!-- #comment-## -->
111.    [Cómo Instalar, Cifrar, Encriptar, y Codificar Archivos y Carpetas Usando Tomb En Linux - SitioLinux](https://www.sitiolinux.com/como-instalar-cifrar-encriptar-y-codificar-archivos-y-carpetas-usando-tomb-en-linux/) - \[…] Tomb requiere ser instalado utilizando repositorios para algunos paquetes, y utilizando codigo bajado directamente de la página del projecto…
112.    <!-- #comment-## -->
113.    [Tomb File Encryption Tool Protects Your Secret Files In Linux - OSTechNix](https://ostechnix.com/tomb-file-encryption-tool-protect-secret-files-linux/) - \[…] For more usage details, refer the official guide. \[…]
114.    <!-- #comment-## -->

### Submit a Comment [Cancel reply](/software/tomb/#respond)

You must be [logged in](https://www.dyne.org/wp-login.php?redirect_to=https%3A%2F%2Fwww.dyne.org%2Fsoftware%2Ftomb%2F) to post a comment.

<!-- #respond -->

<!-- .et_pb_post -->

<!-- #left-area -->

 

### Check our Software!

[![Solidarity](/wp-content/uploads/2015/08/cafudda.jpg)](/software-products)

 

 

 

<!-- end .et_pb_widget -->

### [Donate $/€/฿](/donate)

[![Solidarity](/wp-content/uploads/2011/10/heart_and_stars.png)](/donate)

### [Support Software Freedom](/donate)

 

<!--
<a href="https://flattr.com/thing/224301/dyne-org-on-Flattr" target="_blank" rel="noopener">
      <img src="https://api.flattr.com/button/flattr-badge-large.png"
           alt="Flattr Dyne.org" title="Flattr Dyne.org" border="0" /></a>
<p>&nbsp;</p>
-->

<!-- end .et_pb_widget -->

[Tweets by @DyneOrg](https://twitter.com/DyneOrg)

<!-- end .et_pb_widget -->

#### Stay in touch

[![dyne crew in 2011](/wp-content/uploads/2011/12/dyne-at-wintercamp.jpg "the Upsetter says: time to get together!")](/category/community)\
☞ Join the [#dyne chat](https://irc.dyne.org)

☞ Participate to our [mailinglists](http://lists.dyne.org)

☞ Talk in the [free speech zone](/free-speech-mumble)

☞ Send us a [private message](https://www.dyne.org/contact)

<!-- end .et_pb_widget -->

<!-- end #sidebar -->

<!-- #content-area -->

<!-- .container -->

<!-- #main-content -->

Copyleft ©2000-2022\
Dyne.org foundation\
Haparandadam 7-A1\
1013AK Amsterdam

Contact: info at dyne dot org

<!-- end .fwidget -->

<!-- end .footer-widget -->

Not for profit organization established in 2005 with reg.num. 34237525 in The Netherlands.

<!-- end .fwidget -->

<!-- end .footer-widget -->

<!-- end .fwidget -->

<!-- end .footer-widget -->

## Stay in touch

Chat and news on [Dyne\_telegram](https://t.me/dyneorg) or drop us a line on IRC: [irc.dyne.org #dyne](https://irc.dyne.org)

<!-- end .fwidget -->

<!-- end .footer-widget -->

<!-- #footer-widgets -->

<!-- .container -->

Designed by [Elegant Themes](http://www.elegantthemes.com "Premium WordPress Themes") | Powered by [WordPress](http://www.wordpress.org)

<!-- .container -->

<!-- #main-footer -->

<!-- #et-main-area -->

<!-- #page-container -->

<!-- Include Matomo -->

<!-- End Matomo Code-->

![Stay in contact](https://www.dyne.org/wp-content/plugins/bloom/images/premade-image-10.png)

## Stay in contact

Sometimes we organize events and workshops around the world, leave us your email if you like to receive a notice.

## Subscribe to our newsletter

Your name Your email

Submit »

## You have Successfully Subscribed!

<!-- Instagram Feed JS -->

<!-- Global site tag (gtag.js) - Google Analytics -->

<!-- Eu Cookie Law 3.1.6 -->

By continuing to use the site, you agree to the use of cookies. [more information](#) Accept

The cookie settings on this website are set to "allow cookies" to give you the best browsing experience possible. If you continue to use this website without changing your cookie settings or you click "Accept" below then you are consenting to this.

[Close](#)
