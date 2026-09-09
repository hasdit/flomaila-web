(function () {
  if (window.__flomailaWidget) return;
  window.__flomailaWidget = true;
  var origin = (document.currentScript && document.currentScript.src) || "";
  var base = origin.split("/widget.js")[0] || "";
  var btn = document.createElement("button");
  btn.setAttribute("aria-label", "Open Flomaila chat");
  btn.style.cssText = "position:fixed;bottom:16px;right:16px;width:56px;height:56px;border-radius:999px;border:0;background:#C2410C;color:#fff;font-size:22px;z-index:2147483000;cursor:pointer;box-shadow:0 8px 24px rgba(0,0,0,.2)";
  btn.textContent = "\uD83D\uDCAC";
  var frame = document.createElement("iframe");
  frame.title = "Flomaila chat";
  frame.src = (base || "") + "/widget";
  frame.style.cssText = "position:fixed;bottom:80px;right:16px;width:360px;height:480px;border:0;border-radius:16px;box-shadow:0 12px 40px rgba(0,0,0,.18);z-index:2147483000;display:none;background:#fff";
  btn.onclick = function () {
    frame.style.display = frame.style.display === "none" ? "block" : "none";
  };
  document.body.appendChild(frame);
  document.body.appendChild(btn);
})();
