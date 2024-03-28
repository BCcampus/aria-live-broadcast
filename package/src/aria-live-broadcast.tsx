export type AnnouncementTone = 'polite' | 'assertive';

const visuallyHiddenStyle: Partial<CSSStyleDeclaration> = {
  position: 'absolute',
  width: '1px',
  height: '1px',
  margin: '-1px',
  border: '0',
  padding: '0',
  whiteSpace: 'nowrap',
  clipPath: 'inset(50%)',
  clip: 'rect(0 0 0 0)',
  overflow: 'hidden',
};

let broadcast: AriaLiveBroadcast | null = null;

class AriaLiveBroadcast {
  private root: HTMLDivElement;
  private politeBox: HTMLDivElement;
  private assertiveBox: HTMLDivElement;

  constructor(id: string = 'bcc-aria-live-broadcast') {
    if (!document.getElementById(id)) {
      this.root = document.createElement('div');
      this.root.id = id;
      Object.assign(this.root.style, visuallyHiddenStyle);

      this.politeBox = this.createMessageBox('polite');
      this.assertiveBox = this.createMessageBox('assertive');

      document.body.appendChild(this.root);
    }
  }

  private createMessageBox(tone: AnnouncementTone) {
    const box = document.createElement('div');
    box.setAttribute('role', 'log');
    box.setAttribute('aria-live', tone);
    box.setAttribute('aria-relevant', 'additions');

    return this.root.appendChild(box);
  }

  announce(message: string, tone: AnnouncementTone = 'polite', ttl: number = 10000) {
    if (!this.root || !message.trim()) {
      return;
    }

    const msgEl = document.createElement('div');
    msgEl.textContent = message;

    if (tone === 'assertive') this.assertiveBox.appendChild(msgEl);
    else this.politeBox.appendChild(msgEl);

    setTimeout(() => {
      msgEl.remove();
    }, ttl);
  }
}

export function announce(message: string, tone?: AnnouncementTone, ttl?: number) {
  if (!broadcast) broadcast = new AriaLiveBroadcast();

  broadcast.announce(message, tone, ttl);
}
