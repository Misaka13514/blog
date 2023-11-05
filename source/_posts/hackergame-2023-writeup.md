---
title: Hackergame 2023 WriteUp
date: 2023-11-04 12:00:00
tags:
  - CTF
  - Hackergame
  - WriteUp
categories: 技术向
---

Hackergame，启动！

<!-- more -->

## Hackergame 启动

打开题目看逻辑觉得是用声音环回 ~~（我做过一个机器评分的英语口语作业就是这样做的）~~ ，但是相似度只有 76.27%。看了代码发现相似度是根据波型图计算的。直接提交，发现地址栏中多了一个参数`?similarity=76.27167352376027`，修改为 100 后启动 Hackergame 2023。

![hackergame-start](https://cdn.jsdelivr.net/gh/Misaka13514/asset@main/blog/_posts/hackergame-2023-writeup/hackergame-start.png)

- `flag{WElcomE-t0-HAcKErG4M3-And-ENJOY-h@ck!Ng-Z0z3}`

## 猫咪小测

### 1. 想要借阅世界图书出版公司出版的《A Classical Introduction To Modern Number Theory 2nd ed.》，应当前往中国科学技术大学西区图书馆的哪一层？

[馆藏分布 - 中国科学技术大学图书馆](https://lib.ustc.edu.cn/%e6%9c%ac%e9%a6%86%e6%a6%82%e5%86%b5/%e9%a6%86%e8%97%8f%e5%88%86%e5%b8%83/)，外文书库在 `12` 层。

### 2. 今年 arXiv 网站的天体物理版块上有人发表了一篇关于「可观测宇宙中的鸡的密度上限」的论文，请问论文中作者计算出的鸡密度函数的上限为 10 的多少次方每立方秒差距？（30 分）

[Nuggets of Wisdom: Determining an Upper Limit on the Number Density of Chickens in the Universe](https://arxiv.org/abs/2303.17626)，`23` 次方。

### 3. 为了支持 TCP BBR 拥塞控制算法，在编译 Linux 内核时应该配置好哪一条内核选项？

`CONFIG_TCP_CONG_BBR`

### 4. 🥒🥒🥒：「我……从没觉得写类型标注有意思过」。在一篇论文中，作者给出了能够让 Python 的类型检查器 MyPY mypy 陷入死循环的代码，并证明 Python 的类型检查和停机问题一样困难。请问这篇论文发表在今年的哪个学术会议上？（20 分）

`ECOOP`，没搜到，爆破的。

- `flag{W3lcoMe-70-At7ENd-THe-NeK0-Ex@m-ZoZ3}`
- `flag{R34L-m457er-Of-7he-nEK0-eXAM-1n-US7c}`

## 更深更暗

直接看代码，找到：

```js
async function getFlag(token) {
  // Generate the flag based on user's token
  let hash = CryptoJS.SHA256(`dEEper_@nd_d@rKer_${token}`).toString();
  return `flag{T1t@n_${hash.slice(0, 32)}}`;
}
```

## 旅行照片 3.0

### 1、你还记得与学长见面这天是哪一天吗？（格式：yyyy-mm-dd）

中午的图 1 中左下的学长戴着 [STATPHYS28](https://statphys28.org/)，尝试 2023-08-07 ~ 2023-08-11

`2023-08-10`

### 2、在学校该展厅展示的所有同种金色奖牌的得主中，出生最晚者获奖时所在的研究所缩写是什么？

[日本人のノーベル賞受賞者](https://ja.wikipedia.org/wiki/%E6%97%A5%E6%9C%AC%E4%BA%BA%E3%81%AE%E3%83%8E%E3%83%BC%E3%83%99%E3%83%AB%E8%B3%9E%E5%8F%97%E8%B3%9E%E8%80%85)

与小柴昌俊（M. KOSHIBA）同展厅、东京大学

[梶田隆章](https://www.icrr.u-tokyo.ac.jp/prwps/commemorative/nobel/description.html)

`ICRR`

### 3、帐篷中活动招募志愿者时用于收集报名信息的在线问卷的编号（以字母 S 开头后接数字）是多少？

题目指出博物馆对面有喷泉，在地图上查找后：東京国立博物館、上野公園大噴水

搜索 `上野公園 2023-08-10 ボランティア`，找到[全国梅酒まつり in 東京 2023](https://umeshu-matsuri.jp/tokyo_staff/)

`S495584522`

### 4、学长购买自己的博物馆门票时，花费了多少日元？

[料金・チケットのご案内](https://www.tnm.jp/modules/r_free_page/index.php?id=113#ticket)写的是 500，尝试后发现不对

`0`

### 5、学长当天晚上需要在哪栋标志性建筑物的附近集合呢？（请用简体中文回答，四个汉字）

不知道，只找到可能是对应游船的[運航案内](https://www.suijobus.co.jp/cruise/)。

### 6、进站时，你在 JR 上野站中央检票口外看到「ボタン＆カフリンクス」活动正在销售动物周边商品，该活动张贴的粉色背景海报上是什么动物（记作 A，两个汉字）？ 在出站处附近建筑的屋顶广告牌上，每小时都会顽皮出现的那只 3D 动物是什么品种？（记作 B，三个汉字）？（格式：A-B）

搜索ボタン＆カフリンクス 上野駅，找到[上野駅の会場の様子](https://plaza.rakuten.co.jp/ayumilife/diary/202308070000/)，`熊猫`；

识别马里奥世界照片，结果是 Nintendo TOKYO Official Store，推断在渋谷駅出站。搜索渋谷駅 3D，找到[渋谷駅近くのビルで超巨大な秋田犬が遊び回っている……！？ 巨大 3D ビジョンに注目](https://www.moguravr.com/shibuya-akitainu-3d/)，`秋田犬`。

- `flag{how_I_wi5h_i_COulD_w1N_A_Nobe1_pri23_76081fe0cf}`
- `flag{PluM_w1NE_1S_rEa1LY_EXpen5iVE_c403ec700c}`
- 第三问没对

## 赛博井字棋

使用截断代理，先下连成线的两步，在第三步请求发送前截断请求，修改坐标为对手已下过的位置，且使得你能连成一线。

- `flag{I_can_eat_your_pieces_19e0b10842}`

## 奶奶的睡前 flag 故事

因为之前读到过有关漏洞的新闻，结合题目的描述，知道是 [aCropalypse](https://en.wikipedia.org/wiki/ACropalypse) 漏洞。一开始使用 [acropalypse.app](https://acropalypse.app/) 但是可能是我打开方式不对没成功。使用 [frankthetank-music/Acropalypse-Multi-Tool](https://github.com/frankthetank-music/Acropalypse-Multi-Tool) 成功解出 flag。

![grandma-flag](https://cdn.jsdelivr.net/gh/Misaka13514/asset@main/blog/_posts/hackergame-2023-writeup/grandma-flag.png)

- `flag{sh1nj1ru_k0k0r0_4nata-m4h0}`

## 组委会模拟器

通过 js 看出几个 api 的调用方法，通过抓包分析了似乎只需要判断 `hack[`，为了避免时间漂移用了 `threading.Timer`。

```python
import requests
import threading

host = "http://202.38.93.111:10021"

def getMessages(session):
    messages = session.post(host + "/api/getMessages")
    messages = messages.json()
    return messages

def deleteMessage(session, id):
    response = session.post(host + "/api/deleteMessage", json={"id": id})
    print(response.json())

def getFlag(session):
    response = session.post(host + "/api/getflag")
    print(response.json())

with requests.Session() as session:
    session.cookies.set(
        "session",
        "<fill your cookie here>",
    )
    messages = getMessages(session)
    deleteList = []
    for i, m in enumerate(messages["messages"]):
        if "hack[" in m["text"]:
            print(i, m["text"], m["delay"])
            deleteList.append({"id": i, "delay": m["delay"]})
    for i in deleteList:
        timer = threading.Timer(i["delay"], deleteMessage, args=(session, i["id"]))
        timer.start()
    timer.join()
    getFlag(session)
```

- `flag{Web_pr0gra_mm1ng_9c917fb7f6_15fun}`

## 虫

一听就是 SSTV ~~（玩无线电玩的）~~ ，直接解码。[Signal Identification Guide](https://www.sigidwiki.com/wiki/Signal_Identification_Guide)

![sstv](https://cdn.jsdelivr.net/gh/Misaka13514/asset@main/blog/_posts/hackergame-2023-writeup/sstv.png)

- `flag{SSssTV_y0u_W4NNa_HaV3-4_trY}`

## JSON ⊂ YAML?

`{"a": NaN, "a": NaN}` 可以同时拿下两个 flag。

- `flag{faf9facd7c9d64f74a4a746468400a507ce3e2652b}`
- `flag{b1c73f14d04db546b7e7e24cf1cc72521a136c3e6b}`

btw 相比于 json 我更喜欢 yaml

## Git? Git!

```sh
$ git reflog
ea49f0c (HEAD -> main) HEAD@{0}: commit: Trim trailing spaces
15fd0a1 (origin/main, origin/HEAD) HEAD@{1}: reset: moving to HEAD~
505e1a3 HEAD@{2}: commit: Trim trailing spaces
15fd0a1 (origin/main, origin/HEAD) HEAD@{3}: clone: from https://github.com/dair-ai/ML-Course-Notes.git
$ git checkout --force 505e1a3
HEAD is now at 505e1a3 Trim trailing spaces
$ grep -R flag .
./.git/hooks/fsmonitor-watchman.sample:		# return the fast "everything is dirty" flag to git and do the
./README.md:  <!-- flag{TheRe5_@lwAy5_a_R3GreT_pi1l_1n_G1t} -->
```

- `flag{TheRe5_@lwAy5_a_R3GreT_pi1l_1n_G1t}`

## HTTP 集邮册

只收集到了 10 个状态码：[100, 200, 206, 304, 400, 404, 405, 414, 416, 505]

无状态码把首行改成`GET /\r\n`。

- `flag{stacking_up_http_status_codes_is_fun_97ad87477e}`
- `flag{great backward compatibility of nginx, R1ght?}`

## Docker for Everyone

原来是打算用 `--privileged` 加挂载写入提权，但是都只读，cron 也没有。

```sh
alpine:~$ ls -l /flag
lrwxrwxrwx    1 root     root            13 Oct  8 12:10 /flag -> /dev/shm/flag
alpine:~$ docker run -it --rm -v /dev/shm/flag:/flag alpine
/ # cat /flag
flag{u5e_r00t1ess_conta1ner_7d2661333c_plz!}
```

- `flag{u5e_r00t1ess_conta1ner_7d2661333c_plz!}`

## 惜字如金 2.0

先把代码手动还原一些，发现只有 `code_dict` 还原有多种情况，使用 python 代码暴力破解：

```python
import itertools

code_dicts = [
    "nymeh1niwemflcir}echaet",
    "a3g7}kidgojernoetlsup?h",
    "ulw!f5soadrhwnrsnstnoeq",
    "ct{l-findiehaai{oveatas",
    "ty9kxborszstguyd?!blm-p",
]

def split_string(s: str) -> list[str]:
    result = []
    current = ""
    for c in s:
        if c.isalpha():
            current += c
        else:
            if current:
                result.append(current)
                current = ""
            result.append(c)
    if current:
        result.append(current)
    return result

def expand_consonants(s: str) -> list[str]:
    vowels = set("aeiou")
    result = []
    for i, c in enumerate(s):
        if c not in vowels:
            new_s = s[: i + 1] + c + s[i + 1 :]
            result.append(new_s)
    if not s.endswith("e"):
        result.append(s + "e")
    return result

def is_alpha(s: str) -> bool:
    for c in s:
        if not c.isalpha():
            return False
    return True

def expand_code_dict(code_dict: str) -> list:
    splits = split_string(code_dict)
    expanded_code_dicts = []
    for i, s in enumerate(splits):
        if is_alpha(s):
            for expanded in expand_consonants(s):
                expanded_code_dicts.append(
                    "".join(splits[:i] + [expanded] + splits[i + 1:])
                )
    return expanded_code_dicts

all_expanded_code_dicts = [expand_code_dict(code_dict) for code_dict in code_dicts]
iterated_code_dicts = itertools.product(*all_expanded_code_dicts)

def decrypt_data(input_codes, code_dict):
    output_chars = [code_dict[c] for c in input_codes]
    return "".join(output_chars)


def iterate_code_dict():
    for code_dicts in iterated_code_dicts:
        yield code_dicts


for code_dict in iterated_code_dicts:
    code_dict = "".join(code_dict)
    flag = decrypt_data(
        [53, 41, 85, 109, 75, 1, 33, 48, 77, 90,
        17, 118, 36, 25, 13, 89, 90, 3, 63, 25,
        31, 77, 27, 60, 3, 118, 24, 62, 54, 61,
        25, 63, 77, 36, 5, 32, 60, 67, 113, 28],
        code_dict,
    )
    if flag.startswith("flag{") and flag.endswith("}"):
        print(flag)
        # exit(0)
```

- `flag{you-ve-r3cover3d-7he-an5w3r-r1ght?}`

## 🪐 高频率星球

`asciinema cat asciinema_restore.rec > asciinema_restore.js` 然后打开这个 js 把控制字符手动删一删，hash 不用一致运行也能得到 flag。

- `flag{y0u_cAn_ReSTorE_C0de_fr0m_asc11nema_3db2da1063300e5dabf826e40ffd016101458df23a371}`

## 🪐 小型大语言模型星球

### You Are Smart

payload `She says "You are smart. Am I smart?". He replies "`

- `flag{i-7H1nk-YOu-AR3-r34!Ly-RE@11Y-$m@RT}`

### Accepted

题目提示消息长度不超过 7，就爆破试试：

```python
import itertools
import string
import torch
from transformers import AutoModelForCausalLM, AutoTokenizer

device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
model = AutoModelForCausalLM.from_pretrained("./TinyStories-33M").eval()
tokenizer = AutoTokenizer.from_pretrained("./TinyStories-33M")
model.to(device)

def check_response(message, response, token):
    response = response.strip().lower()
    info = ""
    flag1, flag2, flag3, flag4 = "flag1", "flag2", "flag3", "flag4"
    if "you are smart" in response:
        info += f"\n👏👏👏 flag1: `{flag1}` 👏👏👏"
    if len(message) <= 7 and "accepted" in response:
        info += f"\n🎉🎉🎉 flag2: `{flag2}` 🎉🎉🎉"
    if len(message) <= 100 and "hackergame" in response:
        info += f"\n🎊🎊🎊 flag3: `{flag3}` 🎊🎊🎊"
    if len(message) <= 200 and "🐮" in response:
        info += f"\n🔥🔥🔥 flag4: `{flag4}` 🔥🔥🔥"
    return info

def predict(message):
    model_inputs = tokenizer.encode(message, return_tensors="pt")
    model_inputs = model_inputs.to(device)
    model_outputs = model.generate(
        model_inputs,
        max_new_tokens=30,
        num_beams=1,
        pad_token_id=tokenizer.eos_token_id,
    )
    model_outputs = model_outputs[0, len(model_inputs[0]) :]
    model_output_text = tokenizer.decode(model_outputs, skip_special_tokens=True)
    return model_output_text

alphabet = string.ascii_lowercase + string.digits

for length in range(1, 8):
    for candidate in itertools.product(alphabet, repeat=length):
        message = "".join(candidate)
        model_output_text = predict(message)
        print(message, model_output_text)
        if "accepted" in model_output_text:
            info = check_response(message, model_output_text, "")
            print(message, model_output_text, info)
            input()
```

payload `dju`

- `flag{yOU-4r3-aCC3Pt3d-7O-C0N71nuE-7HE-gaMe}`

## 🪐 流式星球

```python
import cv2
import numpy as np


def create_video(file, output):
    vidcap = cv2.VideoCapture(file)
    frame_count = int(vidcap.get(cv2.CAP_PROP_FRAME_COUNT))
    frame_width = int(vidcap.get(cv2.CAP_PROP_FRAME_WIDTH))
    frame_height = int(vidcap.get(cv2.CAP_PROP_FRAME_HEIGHT))

    buffer = np.empty(shape=(frame_count, frame_height, frame_width, 3), dtype=np.uint8)

    for i in range(frame_count):
        success, frame = vidcap.read()
        if not success:
            raise Exception(f"Failed to read frame {i}")
        buffer[i] = frame

    buffer = buffer.reshape((frame_count * frame_height * frame_width, 3))
    buffer = buffer.ravel()
    # buffer = buffer[: -random.randint(0, 100)]
    buffer.tofile(output)


def restore_video(file, output, frame_count, frame_width, frame_height):
    frame_rate = 30
    codec = "mp4v"

    # Read the binary file as a numpy array
    buffer = np.fromfile(file, dtype=np.uint8)

    # drop the last few bytes
    buffer = buffer[: (3 * frame_count * frame_width * frame_height)]

    # Reshape the array to the original shape of the video frames
    buffer = buffer.reshape((frame_count, frame_height, frame_width, 3))

    # Create a video writer object with the same properties as the original video
    vidwriter = cv2.VideoWriter(
        output, cv2.VideoWriter_fourcc(*codec), frame_rate, (frame_width, frame_height)
    )

    # Write each frame to the output video file
    for i in range(frame_count):
        vidwriter.write(buffer[i])

    # Release the video writer object
    vidwriter.release()


if __name__ == "__main__":
    frame_width = 427
    frame_height = 439
    frame_count = int(135146688 / (frame_width * frame_height * 3))
    restore_video("video.bin", "video.mp4", frame_count, frame_width, frame_height)
```

可惜末尾被随机丢了一部分，否则可以分解因数算出长宽

- `flag{it-could-be-easy-to-restore-video-with-haruhikage-even-without-meta-data-0F7968CC}`

## 🪐 低带宽星球

我最好的两个结果，一个是 [compress-or-die](https://compress-or-die.com/) 压缩的 webp，178 字节；另一个是我自己试的 svg，156 字节：

```xml
<svg>
  <rect width="1024" height="1024" fill="#547b9b"/>
  <rect width="675" height="1024" fill="#b05ea2"/>
  <rect width="358" height="1024" fill="#ae3c09"/>
</svg>
```

- `flag{A1ot0f_t0015_is_available_to_compre55_PNG}`

## 异星歧途

进入游戏可以按空格暂停。

查看第一个微型处理器的逻辑：

```text
sensor s1 switch1 @enabled
sensor s2 switch2 @enabled
sensor s3 switch3 @enabled
sensor s4 switch4 @enabled
sensor s5 switch5 @enabled
sensor s6 switch6 @enabled
sensor s7 switch7 @enabled
sensor s8 switch8 @enabled
jump 18 equal s1 false
jump 18 equal s2 true
jump 18 equal s3 false
jump 18 equal s4 true
jump 18 equal s5 true
jump 18 equal s6 false
jump 18 equal s7 true
jump 18 equal s8 false
control enabled generator1 1 0 0 0
end
control enabled generator1 0 0 0 0
end
```

容易得出 10100101

查看第二个逻辑处理器的逻辑：

```text
sensor sw1 switch1 @enabled
sensor sw2 switch2 @enabled
sensor sw3 switch3 @enabled
sensor sw4 switch4 @enabled
sensor sw5 switch5 @enabled
sensor sw6 switch6 @enabled
sensor sw7 switch7 @enabled
sensor sw8 switch8 @enabled
op shl t sw1 7
set number t
op shl t sw2 6
op add number number t
op shl t sw3 5
op add number number t
op shl t sw4 4
op add number number t
op shl t sw5 3
op add number number t
op shl t sw6 2
op add number number t
op shl t sw7 1
op add number number t
set t sw8
op add number number t
set en 0
set i 0
jump 33 greaterThanEq i 16
op pow fl0 i 2
jump 31 notEqual fl0 number
set en 1
jump 33 always x false
op add i i 1
jump 26 always x false
op equal fl1 0 sw1
op equal fl2 0 sw6
op or fl3 fl1 fl2
jump 38 equal fl3 0
set en 0
control enabled generator1 en 0 0 0
control enabled panel1 en 0 0 0
end
```

通过末尾几句确定 sw1 和 sw6 为 1，前面的逻辑求了整个八位二进制的值，并判断它是不是 0 到 15 中某个数的平方。

容易得出 11000100

第三个不是特别明白，第四个是外部逻辑电路尝试得到 01110111

使用 pwntools 爆破得到 flag （

- `flag{B34WarE_0f_#xp1osi0N_352dbe3717}`

## See also

- [Hackergame 2023 WriteUp on 無意識のサクラ ANOTHER LAYER](https://blog.koishi514.moe/index.html?type=article&filename=3hiGMKZFfDNK.md)
- [年轻人的第一届 Hackergame — Some writeups for USTC Hackergame 2023 on chihuo2104 の部落格](https://blog.chihuo2104.dev/posts/ustc-hackergame2023-writeups)
- [CTF | 2023 USTC Hackergame WriteUp on MiaoTony's 小窝](https://miaotony.xyz/2023/11/05/CTF_2023Hackergame/)
- [【CTF】writeup——hackergame 2023 on 某魏‘s Blog](https://tqlwsl.moe/index.php/archives/2623/)
- [Hackergame 2023 Writeup on Garden in the Wonderland](https://blog.yuuta.moe/2023/11/03/ctf-hackergame2023/)
