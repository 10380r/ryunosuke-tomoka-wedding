const tables = {
  omiya: {
    label: "大宮南高校のお友達",
    rows: [
      [{ kana: "にしはた なおき", name: "西畑 直生", honorific: "様" }, { kana: "みやした ゆうじ", name: "宮下 勇司", honorific: "様" }],
      [{ kana: "たけうち りく", name: "竹内 陸", honorific: "様" }, { kana: "かんだ さとし", name: "神田 聡", honorific: "様" }],
      [{ kana: "しんどう がい", name: "進藤 凱", honorific: "様" }, { kana: "にし だいち", name: "西 大智", honorific: "様" }],
      [{ kana: "さいとう しゅん", name: "齋藤 竣", honorific: "様" }, { kana: "たけのうち かいと", name: "竹野入 海杜", honorific: "様" }],
      [{ kana: "はやし ゆうま", name: "林 雄馬", honorific: "様" }, { kana: "かわかみ たくみ", name: "川上 拓海", honorific: "様" }],
      [null, { kana: "わかな りょうすけ", name: "若菜 亮佑", honorific: "様" }]
    ]
  },
  future: {
    label: "フューチャーと周辺のお友達",
    rows: [
      [{ kana: "りお", name: "Leo Zhong", honorific: "様" }, { kana: "よこぎ みほ", name: "横木 美保", honorific: "様" }],
      [{ kana: "わたなべ ゆり", name: "渡邉 百合", honorific: "様" }, { kana: "なかむら ももか", name: "中村 百花", honorific: "様" }],
      [{ kana: "きくち のりこ", name: "菊地 紀子", honorific: "様" }, { kana: "さめじま なつこ", name: "鮫島 奈津子", honorific: "様" }],
      [{ kana: "もりごだ ろーしゃな", name: "森五田 ローシャナ", honorific: "様" }, { kana: "たかはし ゆうほ", name: "高橋 結帆", honorific: "様" }],
      [{ kana: "さかもと なお", name: "坂本 菜緒", honorific: "様" }, { kana: "たかはし ひでかず", name: "高橋 秀和", honorific: "様" }],
      [{ kana: "たなか としや", name: "田中 利弥", honorific: "様" }, { kana: "ななめき だいすけ", name: "斜木 大輔", honorific: "様" }],
      [{ kana: "あおやぎ ゆうと", name: "青柳 雄登", honorific: "様" }, { kana: "みつはし けいすけ", name: "三橋 慶輔", honorific: "様" }],
      [{ kana: "おおにし たくみ", name: "大西 琢己", honorific: "様" }, null]
    ]
  },
  hokudai: {
    label: "北海道大学のお友達",
    rows: [
      [{ kana: "すずき はるか", name: "鈴木 はる香", honorific: "様" }, { kana: "むらかみ りこ", name: "村上 莉子", honorific: "様" }],
      [{ kana: "たかくら ゆり", name: "高倉 有梨", honorific: "様" }, { kana: "あんとなす なな", name: "アントナス 菜々", honorific: "様" }]
    ]
  },
  toyama: {
    label: "富山家",
    rows: [
      [{ kana: "やまね かずこ", name: "山根 和子", honorific: "様" }, null],
      [{ kana: "とみやま かのん", name: "富山 佳音", honorific: "" }, { kana: "とみやま れんたろう", name: "富山 連太郎", honorific: "" }],
      [{ kana: "やまぐち みき", name: "山口 美貴", honorific: "様" }, { kana: "とみやま まさひろ", name: "富山 政宏", honorific: "様" }],
      [{ kana: "とみやま ゆか", name: "富山 由佳", honorific: "" }, { kana: "とみやま しげる", name: "富山 重", honorific: "" }]
    ]
  },
  shiota: {
    label: "塩田家",
    rows: [
      [{ kana: "いりが たつお", name: "入賀 辰夫", honorific: "様" }, null],
      [{ kana: "いりが みゆき", name: "入賀 美幸", honorific: "様" }, { kana: "つがわ たもつ", name: "津川 保", honorific: "様" }],
      [{ kana: "こじま りか", name: "小島 梨佳", honorific: "様" }, { kana: "つがわ じゅんこ", name: "津川 純子", honorific: "様" }],
      [{ kana: "こじま けいと", name: "小島 圭仁", honorific: "くん" }, { kana: "まつもと あさみ", name: "松本 亜紗美", honorific: "様" }],
      [{ kana: "こじま たくや", name: "小島 拓也", honorific: "様" }, { kana: "まつもと きょうこ", name: "松本 恭子", honorific: "様" }],
      [{ kana: "しおだ ひろゆき", name: "塩田 裕之", honorific: "" }, { kana: "しおだ ゆうこ", name: "塩田 裕子", honorific: "" }]
    ]
  }
};

const seatLayout = document.getElementById("seat-layout");
const seatDetail = document.getElementById("seat-detail");
const seatSwitcher = document.querySelector(".seat-switcher");
const seatGrid = document.getElementById("seat-grid");
const seatDetailTitle = document.getElementById("seat-detail-title");
const detailBack = document.getElementById("detail-back");
const tableButtons = document.querySelectorAll("[data-table]");

if (seatLayout && seatDetail && seatSwitcher && seatGrid && seatDetailTitle && detailBack) {
  let activeTrigger = null;
  let activePanel = seatLayout;
  let cleanupTimer = null;

  const syncHeight = (panel = activePanel) => {
    const nextHeight = panel.getBoundingClientRect().height;
    if (nextHeight > 0) {
      seatSwitcher.style.height = `${nextHeight}px`;
      activePanel = panel;
    }
  };

  const buildSeatUnit = (seat, index) => {
    const unit = document.createElement("div");
    unit.className = "seat-unit";

    if (!seat) {
      unit.classList.add("is-empty");
      unit.setAttribute("aria-hidden", "true");
      return unit;
    }

    unit.style.animationDelay = `${index * 0.05}s`;
    unit.innerHTML = `
      <div class="seat-name-row">
        <span class="seat-name">${seat.name}</span>
        ${seat.honorific ? `<span class="seat-honorific">${seat.honorific}</span>` : ""}
      </div>
    `;

    return unit;
  };

  const openTable = (key, trigger) => {
    const table = tables[key];
    if (!table) {
      return;
    }

    if (cleanupTimer) {
      window.clearTimeout(cleanupTimer);
      cleanupTimer = null;
    }

    activeTrigger = trigger;
    seatDetailTitle.textContent = table.label;
    seatGrid.innerHTML = "";

    table.rows.flat().forEach((seat, index) => {
      seatGrid.appendChild(buildSeatUnit(seat, index));
    });

    requestAnimationFrame(() => {
      syncHeight(seatDetail);
      seatSwitcher.classList.add("is-detail-view");
    });
    detailBack.focus({ preventScroll: true });
  };

  const closeTable = () => {
    syncHeight(seatLayout);
    seatSwitcher.classList.remove("is-detail-view");

    cleanupTimer = window.setTimeout(() => {
      seatGrid.innerHTML = "";
      cleanupTimer = null;
    }, 400);

    if (activeTrigger) {
      activeTrigger.focus({ preventScroll: true });
    }
  };

  tableButtons.forEach((button) => {
    button.addEventListener("click", () => {
      openTable(button.dataset.table, button);
    });

    button.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        openTable(button.dataset.table, button);
      }
    });
  });

  detailBack.addEventListener("click", closeTable);

  window.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && seatSwitcher.classList.contains("is-detail-view")) {
      closeTable();
    }
  });

  window.addEventListener("resize", () => {
    syncHeight(seatSwitcher.classList.contains("is-detail-view") ? seatDetail : seatLayout);
  });

  window.addEventListener("load", () => {
    syncHeight(seatLayout);
  });

  syncHeight(seatLayout);
}
