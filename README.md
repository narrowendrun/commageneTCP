# commageneTCP

An experimental tool for generating tcpdump commands with an intuitive interface.

**[Try it live →](https://narrowendrun.github.io/commageneTCP/)**

> ⚠️ **Currently in development** - Features and functionality may change

## Features

### Command Generation
- Generate bash tcpdump commands with custom options and filters
- Create Wireshark live capture commands
- Persistent settings - your preferences are saved between sessions
- Command cache stores generated commands for later reference

### Flexible Filtering
- Wide variety of protocol and parameter filters
- Compound filters with customizable logic operators
- Group filters by drag-and-drop selection (currently being worked on)
- Protocol filters automatically use 'OR' logic (packets can't be multiple protocols simultaneously)
- Parameter filters support both 'AND' and 'OR' operations

## Understanding tcpdump Structure

A tcpdump command consists of three main components:

```bash
tcpdump [options] -i [interface] [filters]
```

1. **Option flags** - Control output format and behavior
2. **Interface** - Network interface to capture from  
3. **Filters** - Define which packets to capture

## Available Options

- **Verbosity** (`-v`) - Control detail level of output
- **Timestamp** (`-t`) - Modify timestamp display
- **Host/Service Names** (`-n`) - Control name resolution
- **MAC Address** (`-e`) - Include MAC addresses in output
- **Quick Display** (`-q`) - Enable abbreviated output
- **Packet Count** (`-c`) - Limit number of packets captured
- **Packet Flow** (`-Q`) - Control packet direction

> 💡 All option settings are automatically saved and persist between sessions. The options panel can be minimized when not needed.

## Filter Categories

### Protocols
Filters that require no additional arguments:
- ARP, OSPFv2, LLDP, etc.
- Automatically combined with 'OR' logic

### Parameters  
Filters that accept arguments:
- VLAN, VXLAN, MAC addresses, IP addresses, etc.
- Configurable 'AND'/'OR' logic via toggle buttons

## Command Cache

- Automatically stores copied commands for reference
- Add custom comments to track command purposes
- Persistent storage across sessions

## Usage Tips

- **Compounding**: Filters are combined by default as you select them
- **Grouping**: Drag to select multiple filters and group them together
- **Logic operators**: Use the toggle buttons next to parameter filters to switch between 'AND' and 'OR'
- **Examples**: 
  - A packet can have `dst IP A AND src IP B`
  - A packet cannot be both `ARP AND LLDP`

---

Happy packet capturing! 🎉
