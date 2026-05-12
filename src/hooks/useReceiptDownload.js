import jsPDF from 'jspdf';

/**
 * Payment data থেকে সুন্দর Receipt PDF generate করে download করে।
 * @param {Object} payment - paymentCollection এর একটি payment document
 */
const useReceiptDownload = () => {
  const downloadReceipt = payment => {
    const doc = new jsPDF({ unit: 'pt', format: 'a4' });

    const W = doc.internal.pageSize.getWidth();
    const H = doc.internal.pageSize.getHeight();

    // ─── পেইজ ব্যাকগ্রাউন্ড ───────────────────────────────────────
    doc.setFillColor(248, 250, 252); // slate-50
    doc.rect(0, 0, W, H, 'F');

    // ─── Header ব্লক ──────────────────────────────────────────────
    doc.setFillColor(11, 153, 206); // #0b99ce
    doc.roundedRect(40, 30, W - 80, 90, 12, 12, 'F');

    // ─── CLUB SPHERE (Different Colors) ──────────────────────────
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(26);

    // CLUB
    doc.setTextColor(255, 255, 255);
    doc.text('CLUB', 68, 78);

    // SPHERE
    doc.setTextColor(255, 215, 0); // golden
    doc.text('SPHERE', 138, 78);

    // Subtitle
    doc.setFontSize(11);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(255, 255, 255);
    doc.text('Payment Receipt', 68, 100);

    // Transaction ID — ডান পাশে
    doc.setFontSize(9);
    doc.setTextColor(220, 240, 255);

    const txShort = payment.transactionId
      ? `TXN: ${String(payment.transactionId).slice(-16)}`
      : '';

    doc.text(txShort, W - 48, 100, { align: 'right' });

    // ─── Status Badge ──────────────────────────────────────────────
    const status = (payment.status || 'paid').toUpperCase();

    const badgeColor =
      payment.status === 'free'
        ? [16, 185, 129] // emerald
        : payment.status === 'paid'
          ? [11, 153, 206] // blue
          : [100, 116, 139]; // slate

    doc.setFillColor(...badgeColor);
    doc.roundedRect(W - 130, 38, 82, 26, 8, 8, 'F');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.setTextColor(255, 255, 255);

    doc.text(status, W - 89, 56, { align: 'center' });

    // ─── Amount Block ──────────────────────────────────────────────
    const amount = parseFloat(payment.amount) || 0;

    const amountStr = amount === 0 ? 'FREE' : `$${amount.toFixed(2)}`;

    doc.setFillColor(255, 255, 255);
    doc.roundedRect(40, 140, W - 80, 80, 10, 10, 'F');

    doc.setFontSize(11);
    doc.setTextColor(100, 116, 139);
    doc.setFont('helvetica', 'normal');

    doc.text('Total Amount Paid', W / 2, 168, {
      align: 'center',
    });

    doc.setFontSize(36);
    doc.setFont('helvetica', 'bold');

    doc.setTextColor(
      amount === 0 ? 16 : 11,
      amount === 0 ? 185 : 153,
      amount === 0 ? 129 : 206,
    );

    doc.text(amountStr, W / 2, 208, {
      align: 'center',
    });

    // ─── Details Table ─────────────────────────────────────────────
    const rows = [
      ['Payment Type', formatPaymentType(payment.paymentType)],
      ['Email', payment.userEmail || '—'],
      [
        'Event / Plan',
        payment.eventTitle || payment.planName || payment.clubName || '—',
      ],
      ['Club', payment.clubName || '—'],
      ['Transaction ID', payment.transactionId || '—'],
      ['Date', formatDate(payment.paidAt || payment.createdAt || payment.date)],
      ['Status', status],
    ];

    const tableTop = 250;
    const rowH = 38;
    const colLabel = 56;
    const colValue = 220;
    const tableW = W - 80;

    rows.forEach((row, i) => {
      const y = tableTop + i * rowH;

      // alternating row bg
      if (i % 2 === 0) {
        doc.setFillColor(241, 245, 249); // slate-100
      } else {
        doc.setFillColor(255, 255, 255);
      }

      doc.roundedRect(40, y, tableW, rowH, 0, 0, 'F');

      // label
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(10);
      doc.setTextColor(100, 116, 139);

      doc.text(row[0], colLabel, y + 24);

      // value
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(10);
      doc.setTextColor(30, 41, 59);

      const valStr = String(row[1]);
      const maxW = W - colValue - 60;

      const lines = doc.splitTextToSize(valStr, maxW);

      doc.text(lines[0], colValue, y + 24);
    });

    // table border
    doc.setDrawColor(203, 213, 225);
    doc.setLineWidth(0.5);

    doc.roundedRect(40, tableTop, tableW, rows.length * rowH, 4, 4, 'S');

    // ─── Divider ───────────────────────────────────────────────────
    const divY = tableTop + rows.length * rowH + 28;

    doc.setDrawColor(203, 213, 225);
    doc.setLineWidth(0.5);

    doc.setLineDash([4, 4]);

    doc.line(40, divY, W - 40, divY);

    doc.setLineDash([]);

    // ─── Signature ────────────────────────────────────────────────
    doc.setFont('times', 'italic');
    doc.setFontSize(30);

    doc.setTextColor(15, 23, 42);

    doc.text('AL-AMIN ISLAM', W / 2, divY + 28, {
      align: 'center',
    });

    // ─── Footer ────────────────────────────────────────────────────
    doc.setFontSize(9);
    doc.setTextColor(148, 163, 184);

    doc.setFont('helvetica', 'normal');

    doc.text('© ClubSphere — club-sphere-web.netlify.app', W / 2, divY + 52, {
      align: 'center',
    });

    // ─── Watermark ────────────────────────────────────────────────
    doc.setFontSize(60);
    doc.setTextColor(11, 153, 206);

    doc.setGState(doc.GState({ opacity: 0.04 }));

    doc.setFont('helvetica', 'bold');

    doc.text('CLUBSPHERE', W / 2, H / 2 + 30, {
      align: 'center',
      angle: 30,
    });

    doc.setGState(doc.GState({ opacity: 1 }));

    // ─── Save ──────────────────────────────────────────────────────
    const filename = `receipt_${(payment.transactionId || Date.now())
      .toString()
      .slice(-10)}.pdf`;

    doc.save(filename);
  };

  return { downloadReceipt };
};

// ─── Helpers ──────────────────────────────────────────────────────

function formatPaymentType(type) {
  const map = {
    'plan-membership': 'Plan Membership',
    'club-membership': 'Club Membership',
    event: 'Event Registration',
    free: 'Free',
  };

  return map[type] || type || '—';
}

function formatDate(raw) {
  if (!raw) return '—';

  try {
    return new Date(raw).toLocaleString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  } catch {
    return String(raw);
  }
}

export default useReceiptDownload;
