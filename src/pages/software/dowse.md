---
layout: ../../layouts/Layout.astro
title: "Dowse :: Network Awareness"
description: "Dowse is a beautiful network visualization to make us privacy conscious in the Internet of Things era."
---

# Dowse :: LAN rhabdomancy

![Dowse network visualization](/images/projects/dowse/Background-grey-transp.png)

Dowse processes all DNS network connections on its network and makes them visible in real-time, showing when we connect to .com or .org or .net domains, or to the corporate cloud of social networks. This way we can immediately see how many connections are opened by our personal devices, without us even knowing, every time we connect to a network.

![dowsing\_on\_map](https://www.dyne.org/wp-content/uploads/2013/07/dowsing_on_map.png)

Running a network in the age of the Internet of Things means hosting the connectivity of multiple devices owned by a diversity of subjects. Often such devices have full access to private, common and public information about humans operating them. Furthermore, devices can talk to each other without humans even asking and such interactions are not even manifest. This situation raises issues that are not just technical, but socio-political, about the way **connections happen without human consent**, within local networks and towards the outside, to and from the Internet.

![Dowse box](/images/projects/dowse/20160705_082209.jpg)

The risks of *unconscious* abuse or exploitation of information asymmetry is growing tremendously. As **things initiate the context of users**, we are making a major leap towards a world that provides us with contexts that we may not want at all. Getting some insights on such situations is crucial for civil society at large.

Dowse aims to be a smart (A.I. based) software for home based local area networks (LAN), but also small and medium business offices, that makes it possible to **connect objects and people in a friendly, conscious and responsible manner**.

## De-militarizing networking language

Dowse is not only a functional tool, but a symbolic operation proposing a different linguistic approach to networking. In conceptualizing and documenting Dowse all references to military traits are removed: there is no use of “defense”, “shield”, “guardian” or “firewall” words.

The way privacy awareness (rather than protection) is presented to its users is not envisioned as a violent process, but as a responsible, natural act in search of harmony among the things connecting the inside with the outside of one’s private, common and public aspects of life.

![dowse\_title](https://www.dyne.org/wp-content/uploads/2013/07/dowse_title.png)

## Features

*   Easy to configure DHCP server with local hostname resolution on LAN
*   Hardcode MAC entries of known hosts to protect from arp spoofing
*   Basic, fairly secure, iptables firewall configured on the fly for NAT
*   Fast caching of HTTP traffic also helps to save bandwidth
*   Eliminates most Internet advertisements from all websites
*   Transparent proxy avoid the need to configure browsers proxies
*   Usable and easy to administer with basic GNU/Linux sysadmin skills

**Imagine running a network whose password is known to several people**: while one still wants the security about sharing access to be lax in order to enable people to connect, at the same time one cannot ever be sure when new unknown devices connect without constant monitoring. Dowse actively monitors network events to alert the users of significant changes: whenever a new device acquires a new network lease, an audible signal is produced with a welcome message and/or light signals.

Dowse grants guests default network access while the presence of newcomers and unusual connection patterns is signaled. **Users can then mark guest devices as known** (white-listing) to grant wider or fine grained access to them, as well grant known users the right to welcome more guests. Devices can also be assigned a name which will make them reachable on the LAN via human readable URLs, as well customized audible signals like a warm “*welcome back*” for dear guests.

In a highly connected home environment, Dowse will provide an easy to use interface on which proper user-centric design has been done (LEAN UX approach). Inhabitants will be able control exactly which flows of data goes in and out of their private LAN space, being prompted to deal with new devices when they appear: from a new electricity meter to a mobile phone or computer.

![dowse\_by\_anatole](https://www.dyne.org/wp-content/uploads/2013/07/dowse_by_anatole-e1398944153855.jpg)

From a legal perspective, **Dowse clearly separates the leased network device by the network carrier (ISP) from user owned LAN devices**, making them opaque to each other.

Dowse helps **removing undesired advertisements and browser malware** to make Internet surfing less distracting and less dangerous. Dowse filters all clear web traffic to avoid advertisements, but also applies IP block-lists to avoid known malware distributors and botnet connections, also useful to avoid damages and complaints in case a tainted device brought in by a guest connects from inside the network.

![Dowse data protection](/images/projects/dowse/dowse-dataprevention-campaign-1024x576.jpg)

Dowse enhances the privacy of people surfing the Internet in cases where **confidentiality and integrity of research conducted from an office premise or at home is important**. For example in case of journalists and activists, the profiling of DNS resolution queries can be a delicate point of vulnerability to all kinds of covert operations: not just passive tapping, but also active deception. Dowse alleviates the risk in such situation by relying on the connection to a few trusted and authenticated DNS services, encrypting all traffic (UDP port 53) and avoiding most widespread covert practices of user profiling. In case of Internet censorship, Dowse also facilitates access to parallel networks that let users circumvent limitations imposed by a connectivity carrier. Access to parallel networks like Tor, I2P, GNUnet or Netsukuku will be granted without requiring users to install any software.

Dowse is a minimalistic script that can turn an old PC into a **transparent proxy for home network privacy**. It facilitates the setup of a LAN masquerading firewall, web proxy and functions as **gateway to dark web** hidden networks as Tor or I2P.

## Architecture

[![dowsing\_sketch](https://www.dyne.org/wp-content/uploads/2013/07/dowsing_sketch-e1398944251317.png)](https://www.dyne.org/wp-content/uploads/2013/07/dowsing_sketch-e1398944251317.png)

Dowse is a **transparent proxy** facilitating the awareness of ingoing and outgoing connections from and to a local area network.

Dowse provides a **central point of soft control for all local traffic**: from ARP traffic (layer 2) to TCP/IP (layer 3) as well application space, by chaining a firewall setup to a trasparent proxy setup. A core feature for Dowse is that of **hiding all the complexity** of such a setup.

Dowse commnicates with users in various ways: via a web interface, but also pushing messages via audio (synthesized speech), Bonjour and simple apps interfacing with personal mobile devices.

Dowse can implement this with a fairly complex amount of open-source, well established technical tools, simplifying their integrated setup: specific directives files read by daemon applications are generated from a central configuration point. The configuration options visible to users are reduced to the minimum, while adopting **automatic guessing mechanisms in most cases**. Both the implementation and the user interface for Dowse are very, very minimal.

Dowse is also **highly extensible**: interoperability between modules is available using Socks4/5, UNIX pipes, local TCP/IP sockets and port redirection, conforming to specific daemon implementations. At the core of Dowse is a very portable shell script codebase implementing a modular plugin architecture that isolates processes and supports any executable written in any language: Shell, C, Perl, Python etc.

At last, **Dowse also acts as a gateway to the future proliferation of parallel networks**, mostly based on particular content niches or on different levels of privacy granted, like Tor and GNUnet. Using Dowse is possible to access such opaque networks without installing anything on any device, just stepping into an home or office.

Dowse is a snappy solution for shared LANs with many users that do not want to be bombarded by cookies and advertisements from all kinds of Internet spam, while being able to browse the dark webs with a reasonable degree of anonymity. Ideal for medialabs, hackerspaces and such.

## Proof of concept

In this early stage of development Dowse mostly consists of a proof-of-concept implementation. Installation and activation takes a few steps and needs root:

*   Download dowse on a GNU/Linux box (we use Debian 7)
*   Install ZSh, needed to run all scripts in Dowse, then go into the dowse directory (cd /usr/src/dowse in our example)
*   Run ./utils/debian-install.sh as root, it fires up some commands: apt-get, update-rc.d and invoke-rc.d to install dependencies like dnsmasq, privoxy, squid, tor
*   Configure the files in the conf/ folder: settings and network. The files are plain text and include documentation in comments.
*   Launch the dowse script as root, using full path. In our example:\
    \# /usr/src/dowse/dowse start
*   Dowse will launch all daemons dropping root privileges and using the user configured (default user is ‘proxy’)
*   Deactivate the DHCP service (Automatic IP configuration) on any other object on the network, typically your ADSL router.

If all went well now one should be able to connect any device to the\
internet as you did before, but now all the traffic is passing via\
Dowse’s transparent proxy configuration, which weeds out adverts and\
takes care of browser’s privacy.

To make sure that dowse is started at every boot, just add it to the\
/etc/rc.local file, in our example that would be the line:

**/usr/src/dowse/dowse start**

Other commands accepted for now: **stop** or **restart**.

## Downloads

[Dowse on GitHub](https://github.com/dyne/dowse)

Dowse sourcecode can be cloned from GitHub, but stable releases are distributed in .tar.gz source format on our [download zone](https://files.dyne.org/dowse), signed with Jaromil’s GnuPG key for authenticity.

## Source code

For the literates out there, the source code of dowse is pretty simple to read and made available on-line to check what this script does, with comments and documentation. Just in case one likes to be sure what is running as root on his or her own computer: its always good to be questioning.

[Literate code documentation](https://files.dyne.org/dowse/literate/index.html)

## Recommended

If you care about the reliability of your local network, Dowse is a good start. More can be done by using more software that integrates nicely and helps monitoring or refining the firewall system. Here below a non-exaustive list of software we recommend using:

– [DNSCrypt](http://dnscrypt.org/) – secure communications between clients and DNS resolvers

– [PeerGuardian](http://sourceforge.net/projects/peerguardian/) – maintains blocklists on the firewall

– [Tiger](http://savannah.nongnu.org/projects/tiger/) – audits the system’s security

– [SshGuard](http://sshguard.sf.net) – bans failed attempts to log into ssh


## Acknowledgements

Dowse was first conceptualized under the name of [Ghettobox](http://lists.autistici.org/message/20120209.120042.87c96b4f.en.html) and refined in on-line and on-site exchanges within the Italian hackmeeting community.

Its (fairly minimal) codebase is designed, written and maintained by [Jaromil](http://rastasoft.org).

Its realization was inspired by dialogues with Anatole Shaw, Hellekin O. Wolf, Juergen Neumann, Julian Oliver and the [Hackmeeting community](http://hackmeeting.org) at large.

Dowse depends from various free and open source software components redistributed under the GNU GPLv2 and GPLv3, MIT/BSD or Apache\
licenses. Their sources are the property of the respective authors and are used by Dowse in the binary form offered by major distributions.

![Dowse illustration](/images/projects/dowse/Dowse-1024x724.jpeg)

## Credits

The Dowse network visualization shown in the exibition is designed and developed by Denis "Jaromil" Roio, who published it along with the Dowse Whitepaper in 2013.

Soon Jaromil was joined by Rob van Kranenburg who has woven the Dowse narrative to a wider perspective on the Internet of Things, and by Federico Bonelli who ran workshops in various schools using Dowse.

![Dowse workshop](/images/projects/dowse/hd6.jpg)

![Dowse workshop](/images/projects/dowse/h10-1024x683.jpg)

![Dowse workshop](/images/projects/dowse/hd8.jpg)

The project has been funded by SIDN Fonds and received the ISOC NL Prize 2016.

The Dowse software running in this exhibition includes code contributions by Luca Greco, Ivan Jelinčić, Andrea Scarpino, Nicola Rossi and Danilo Spinella, and is based on the DNSCrypt Proxy v2 framework by Frank Denis. Jaromil is still the current maintainer and accepts contributions via Dyne.org.
