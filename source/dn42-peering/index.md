---
title: Peer AS4242421032
date: 2021-04-02 04:42:42
---

## Peering

### Requirement

- Tunnel: Wireguard
- Latency: ≦100ms
- Currently does not accept strangers' peering unless their conditions are perfect.
- Abnormal use will be blocked.
- `THE SERVICE IS PROVIDED "AS IS", WITHOUT WARRANTY ...(sth really long and nobody want to read)... OTHER DEALINGS IN THE SERVICE.`
- All rights reserved.

#### Your Information Required

- ASN
- DN42 IPv4
- Link-Local
- Endpoint
- WireGuard port
- WireGuard public key
- Social contact
- Latency between ours

### My Information

#### Server Info

| Item | Value |
| -- | -- |
| ASN                       | 4242421032                                         |
| DN42 IPv4                 | 172.23.10.1                                        |
| Link-Local                | fe80::1032                                         |
| Hostname                  | sg.dn42.atri.tk                                    |
| Endpoint                  | sg.dn42.atri.tk:「YourASNlast5digits(e.g. 21032)」 |
| WireGuard public key      | x5i9qx8tglqzvghOckjXuRBcWQ8srWLNZOlt7VtFmwI=       |
| BGP software              | bird2                                              |
| Extended next hop support | True                                               |
| Multiprotocol BGP support | True                                               |
| Hosting provider          | DigitalOcean                                       |
| Location                  | Singapore                                          |

Valid before Jan. 15th, 2022.

#### Contact Details

| Item | Value |
| -- | -- |
| PGP Key Fingerprint | [C4B7 1F9E D351 5AEB 8270 D5D7 189B B387 CF3A D95F](https://keys.openpgp.org/vks/v1/by-fingerprint/C4B71F9ED3515AEB8270D5D7189BB387CF3AD95F) |
| E-mail              | [Misaka13514@gmail.com](mailto:Misaka13514@gmail.com)                                                                                        |
| Telegram            | [Misaka_0x34ca](https://t.me/Misaka_0x34ca)                                                                                                  |
| Supported language  | zh_CN, zh_TW, en_US, en_GB, ja_JP                                                                                                            |

### Sample Config

`/etc/wireguard/wg1032.conf`

```conf
[Interface]
ListenPort = <Your WireGuard port>
PrivateKey = <Your PrivateKey>
PostUp = ip addr add dev wg1032 <Your DN42 IPv4>/32 peer 172.23.10.1/32
PostUp = ip addr add dev wg1032 <Your Link-Local>/64
Table = off

[Peer]
PublicKey = x5i9qx8tglqzvghOckjXuRBcWQ8srWLNZOlt7VtFmwI=
Endpoint = sg.dn42.atri.tk:<YourASNlast5digits(e.g. 21032)>
AllowedIPs = 0.0.0.0/0, ::/0
```

`/etc/bird/peers/1032.conf`

```conf
# Delete these below if MP-BGP
protocol bgp dn42_1032 from dnpeers {
    neighbor 172.23.10.1 as 4242421032;
    direct;
}
# Delete these above if MP-BGP

protocol bgp dn42_1032_v6 from dnpeers {
    neighbor fe80::1032%wg1032 as 4242421032;
    direct;
}
```

```sh
systemctl enable --now wg-quick@wg1032
```

## Autonomous System Info

```text
Information related to AS4242421032
aut-num:            AS4242421032
as-name:            RADIONOISE-AS
admin-c:            RADIONOISE-DN42
tech-c:             RADIONOISE-DN42
mnt-by:             RADIONOISE-MNT

Routes for AS4242421032
route4:             172.23.10.0/27
route6:             fdbd:8e82:8b88::/48
```

## Reference

- [Decentralized network 42](https://dn42.us)
- [WireGuard](https://www.wireguard.com)
- [The BIRD Internet Routing Daemon](https://bird.network.cz)
