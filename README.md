# commageneTCP

Hi there! Thanks for checking commageneTCP out.  
This is an experimental tool _(currently in progress)_ that helps users generate tcpdump commands as per their liking.

you can check this out here :
[https://narrowendrun.github.io/commageneTCP/]

### how to use commageneTCP

A tcpdump command can be split into

1. option flags
2. interface
3. filters

   _bash tcpdump <option flags> -i <interface> <filters>_

###Features present in commageneTCP
_####OPTIONS
_ altering verbosity (-v)
_ changing timestamp (-t)
_ host and service names (-n)
_ printing mac address (-e)
_ enabling quick display (-q)
_ limiting packet count (-c)
_ limiting packet flow (-Q)
(Please note that the all changes in the options section will be saved in cache and need not be changed everytime you use the tool. The options section can also be minimised)

_####FILTERS
_ this section has been categorized into _protocols_ and _parametres_
_ *protocols* are filters that need no arguments (ex. ARP, OSPFv2)
_ _parametres_ are filters that may need arguments (ex. VLAN, VXLAN, MAC)
