# commageneTCP

Hi there! Thanks for checking commageneTCP out.  
This is an experimental tool _(currently in progress)_ that helps users generate tcpdump commands as per their liking.

you can check this out here :
[https://narrowendrun.github.io/commageneTCP/]


_______________________________________________________________________________

## main highlights of commageneTCP ##
* generate a bash command and a wireshark live capture command as per your liking
* the options you select will be saved and you need not customise them every time you visit the page
* many filters to choose from
* the commands are generated as soon as there is user input and there is no need for pressing the enter key
* filters can be compounded
* filters can be grouped
* the command you generate will be stored in the command cache as soon as you copy it

_______________________________________________________________________________

> #### quick info on tcpdump ####
> A tcpdump command can be split into :  
>> 1. option flags
>> 2. interface
>> 3. filters
> 
> _bash tcpdump (option flags) -i (interface) (filters)_
   
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

### Features present in commageneTCP ###  
* #### OPTIONS ####
   * altering verbosity&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(-v)
   * changing timestamp&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(-t)
   * host and service names&nbsp;(-n)
   * printing mac address&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(-e)
   * enabling quick display&nbsp;&nbsp;&nbsp;&nbsp;(-q)
   * limiting packet count &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(-c)
   * limiting packet flow&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(-Q)
     
(Please note that the all changes in the options section will be saved in cache and need not be changed everytime you use the tool. The options section can also be minimised)
  
* #### FILTERS ####  
   * this section has been categorized into _protocols_ and _parametres_
   * _protocols_ are filters that need no arguments (ex. ARP, OSPFv2)
   * _parametres_ are filters that may need arguments (ex. VLAN, VXLAN, MAC)

* #### COMMAND CACHE 
   * once the bash command or the wireshark live capture command is copied, it is stored in the command cache section for later reference
   * users can add their comments to keep track of the commands they have generated
 
  - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  
  # customising your command

* As users select their filters, they are compounded by default.   
* Protocols are compounded with an 'or' and this is fixed since a packet cannot be two different protocols at the same time.   
  (ex. a packet cannot be ARP and LLDP)    
* Parametres have a customisable button next to them that can switch between 'and' and 'or'.   
  (ex. a packet can have dst IP A and src IP B)  
* Filters can be grouped by simply dragging and selecting them
* Changes are reflected as input is given and users need not hit the enter key

- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

Hope you like commageneTCP. Happy packet capturing :partying_face:



