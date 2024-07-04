"use client";
import "@/styles/keyboard.css";
import { useEffect, useState } from "react";

export default function Keyboard() { 

    const [key, setKey] = useState<KeyboardEvent>();

    const handleClick = (e: KeyboardEvent) => {
        setKey(e);
    }



    return <div className="case">
    <div className="key" data-key="escape">esc</div>
    <div className="key" data-key="1"></div>
    <div className="key" data-key="2"></div>
    <div className="key" data-key="3"></div>
    <div className="key" data-key="4"></div>
    <div className="key" data-key="5"></div>
    <div className="key" data-key="6"></div>
    <div className="key" data-key="7"></div>
    <div className="key" data-key="8"></div>
    <div className="key" data-key="9"></div>
    <div className="key" data-key="0"></div>
    <div className="key" data-key="-"></div>
    <div className="key" data-key="="></div>
    <div className="key xxl" data-key="backspace"></div>
    <div className="key" data-key="help">ins</div>
    <div className="key" data-key="home"></div>
    {/* Second row */}
    <div className="key large" data-key="tab"></div>
    <div className="key" data-key="q"></div>
    <div className="key" data-key="w"></div>
    <div className="key" data-key="e"></div>
    <div className="key" data-key="r"></div>
    <div className="key" data-key="t"></div>
    <div className="key" data-key="y"></div>
    <div className="key" data-key="u"></div>
    <div className="key" data-key="i"></div>
    <div className="key" data-key="o"></div>
    <div className="key" data-key="p"></div>
    <div className="key" data-key="["></div>
    <div className="key" data-key="]"></div>
    <div className="key large" data-key="\"></div>
    <div className="key" data-key="delete">del</div>
    <div className="key" data-key="end"></div>
    {/* Third row */}
    <div className="key xl" data-key="capslock">caps</div>
    <div className="key" data-key="a"></div>
    <div className="key" data-key="s"></div>
    <div className="key" data-key="d"></div>
    <div className="key" data-key="f"></div>
    <div className="key" data-key="g"></div>
    <div className="key" data-key="h"></div>
    <div className="key" data-key="j"></div>
    <div className="key" data-key="k"></div>
    <div className="key" data-key="l"></div>
    <div className="key" data-key=";"></div>
    <div className="key" data-key="'"></div>
    <div className="key xl" data-key="enter">return</div>
    <div className="key" data-key="f15">pause</div>
    <div className="key" data-key="pageup">pg up</div>
    {/* Fourth row */}
    <div className="key xxl" data-key="shiftleft">shift</div>
    <div className="key" data-key="z"></div>
    <div className="key" data-key="x"></div>
    <div className="key" data-key="c"></div>
    <div className="key" data-key="v"></div>
    <div className="key" data-key="b"></div>
    <div className="key" data-key="n"></div>
    <div className="key" data-key="m"></div>
    <div className="key" data-key=","></div>
    <div className="key" data-key="."></div>
    <div className="key" data-key="/"></div>
    <div className="key xxl" data-key="shiftright">shift</div>
    <div className="key" data-key="arrowup">▲</div>
    <div className="key" data-key="pagedown">pg dn</div>
    {/* Fifth row */}
    <div className="key medium" data-key="controlleft">ctrl</div>
    <div className="key medium" data-key="meta">win</div>
    <div className="key medium" data-key="altleft">alt</div>
    <div className="key huge" data-key=" "></div>
    <div className="key medium" data-key="altright">alt</div>
    <div className="key medium" data-key="fn"></div>
    <div className="key medium" data-key="controlright">ctrl</div>
    <div className="key" data-key="arrowleft">◀</div>
    <div className="key" data-key="arrowdown">▼</div>
    <div className="key" data-key="arrowright">▶</div>
  </div>
}