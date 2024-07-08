import { useCallback, useEffect, useMemo } from "react";

const ModifierBitMasks = {
  alt: 1,
  ctrl: 2,
  meta: 4,
  shift: 8,
};
const ShiftKeys = {
  "~": "`",
  "!": "1",
  "@": "2",
  "#": "3",
  $: "4",
  "%": "5",
  "^": "6",
  "&": "7",
  "*": "8",
  "(": "9",
  ")": "0",
  _: "-",
  "+": "=",
  "|": "\\",
  "{": "[",
  "}": "]",
  ":": ";",
  '"': "'",
  "?": "/",
  "<": ",",
  ">": ".",
};

const Aliases = {
  win: "meta",
  window: "meta",
  cmd: "meta",
  command: "meta",
  esc: "escape",
  opt: "alt",
  option: "alt",
};

const getKeyCombo = (e) => {
  const key = e.key !== " " ? e.key.toLowerCase() : "space"; //키보드로 입력한 키가 " "와 같지 않으면 e.key.toLowerCase() |<-소문자변환|  아니면 space 값을 key에 저장한다

  console.log(key); // 콘솔로그로 입력한 키보드 키를 보여준다

  let modifiers = 0; // 변수 초기화
  if (e.altKey) modifiers += ModifierBitMasks.alt; // alt키가 눌리면 modifiers에 alt값 추가(1)
  if (e.ctrlKey) modifiers += ModifierBitMasks.ctrl; // ctrl키가 눌리면 modifiers에 ctrl값 추가(2)
  if (e.metaKey) modifiers += ModifierBitMasks.meta; // meta키가 눌리면 modifiers에 meta값 추가(4)
  if (e.shiftKey) modifiers += ModifierBitMasks.shift; // shift키가 눌리면 modifiers에 shift값 추가(8)

  return { modifiers, key }; //modifiers와 key 반환
};

const parseKeyCombo = (combo) => {
  // combo라는 파라미터를 받아서
  const pieces = combo.replace(/\s/g, "").toLowerCase().split("+"); //공백을 제거하고 소문자 변환 후 +를 기준으로 앞뒤로 잘라서 각각 저장
  let modifiers = 0; // modifiers를 0으로 초기화
  let key; //key 변수 선언

  for (const piece of pieces) {
    // pieces를 각각 piece에 담아서 반복
    if (ModifierBitMasks[piece]) {
      // 위의 ModifierBitMasks에 piece가 있으면?
      modifiers += ModifierBitMasks[piece]; // modifiers에 더한다
    } else if (ShiftKeys[piece]) {
      // 혹은 shiftKeys에 piece가 있으면?
      modifiers += ModifierBitMasks.shift; // modifiers에 더한다
      key = ShiftKeys[piece]; // key에 shiftKeys[piece]를 저장한다
    } else if (Aliases[piece]) {
      //혹은 Aliases에 있으면?
      key = Aliases[piece]; // key에 저장한다
    } else {
      // 전부 해당하지 않으면
      key = piece; // key에 piece값을 저장한다
    }
  }

  return { modifiers, key }; //modifiers와 key 반환
};

const comboMatches = (a, b) => {
  // a와 b 두 객체를 받아서
  return a.modifiers === b.modifiers && a.key === b.key; // a의 modifiers와 b의 modifiers가 같고 a의 key와 b의 key가 같으면 true 둘중 하나라도 다르면 false 반환
};

const useHotKey = (hotkeys) => {
  //hotkeys로 받아서
  const localKeys = useMemo(() => hotkeys.filter((k) => !k.global), [hotkeys]); // hotkeys 값이 바뀔때마다 global이 아닌건 localkeys에 저장
  const globalKeys = useMemo(() => hotkeys.filter((k) => k.global), [hotkeys]); // global이면 globalkeys에 저장

  const invokeCallback = useCallback(
    (global, combo, callbackName, e) => {
      for (const hotkey of global ? globalKeys : localKeys) {
        // hotkey가 글로벌이면? 글로벌 키 아니면 로컬 키를 hotkey에 저장
        // TODO: 단축키 처리를 한다.
        // callbackName: onKeyDown, onKeyUp
        if (comboMatches(parseKeyCombo(hotkey.combo), combo)) {
          // hotkey.combo값을 위에 parseKeyCombo에 넣고 돌린 뒤 a에 combo를 b에 넣고 위의 comboMatches를 돌린다 그 결과가 참이면
          hotkey[callbackName] && hotkey[callbackName](e); // hotkey[callbackName]가 있으면 실행
        }
      }
    },
    [localKeys, globalKeys] //localkey랑 globalkey가 바뀔때마다
  );

  const handleGlobalKeyDown = useCallback(
    (e) => {
      invokeCallback(true, getKeyCombo(e), "onKeyDown", e); // 위쪽의 invokeCallback에 true, combo, name, e값 전달
    },
    [invokeCallback]
  );

  const handleGlobalKeyUp = useCallback(
    (e) => {
      invokeCallback(true, getKeyCombo(e), "onKeyUp", e); // 위쪽의 invokeCallback에 true, combo, name, e값 전달
    },
    [invokeCallback]
  );

  const handleLocalKeyDown = useCallback(
    (e) => {
      invokeCallback(
        false,
        getKeyCombo(e.nativeEvent), // 위쪽의 invokeCallback에 false, combo, name, e.nativeEvent값 전달 nativeEvent: 브라우저의 기본 이벤트
        "onKeyDown",
        e.nativeEvent
      );
    },
    [invokeCallback]
  );

  const handleLocalKeyUp = useCallback(
    (e) => {
      invokeCallback(
        false,
        getKeyCombo(e.nativeEvent), // 위쪽의 invokeCallback에 false, combo, name, e.nativeEvent값 전달
        "onKeyUp",
        e.nativeEvent
      );
    },
    [invokeCallback]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleGlobalKeyDown); // 키보드가 눌렸을 때 handleGlobalKeyDown 실행
    document.addEventListener("keyup", handleGlobalKeyUp); // 키보드가 눌렷다 때졌을때 handleGlobalKeyUp 실행

    return () => {
      document.removeEventListener("keydown", handleGlobalKeyDown); // 언마운트 될때 handleGlobalkeyDown 해제
      document.removeEventListener("keyup", handleGlobalKeyUp); // 언마운트 될때 handleGlobalKeyUp 해제
    };
  }, [handleGlobalKeyDown, handleGlobalKeyUp]);

  return { handleKeyDown: handleLocalKeyDown, handleKeyUp: handleLocalKeyUp };
};

export default useHotKey;
