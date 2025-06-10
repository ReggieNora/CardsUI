import React, { useState } from "react";

export function AlgorandVerification({ email: initialEmail }: { email: string }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState(initialEmail || "");
  const [txId, setTxId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setTxId(null);
    setSuccess(false);
    try {
      const res = await fetch("http://localhost:4000/api/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (data.txId) {
        setTxId(data.txId);
        setSuccess(true);
      } else {
        setError(data.error || "Unknown error");
      }
    } catch (e: any) {
      setError(e.message || "Network error");
    }
    setLoading(false);
  };

  return (
    <div className="bg-white/10 rounded-xl p-4 my-4 max-w-md mx-auto">
      <div className="font-semibold mb-2">Blockchain Verification (Algorand Demo)</div>
      <form onSubmit={handleVerify} className="space-y-4">
        <div>
          <label className="block text-white/80 mb-1" htmlFor="algoname">Name</label>
          <input
            id="algoname"
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            className="w-full px-3 py-2 rounded bg-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-400"
            placeholder="Your Name"
            autoComplete="off"
          />
        </div>
        <div>
          <label className="block text-white/80 mb-1" htmlFor="algoemail">Email</label>
          <input
            id="algoemail"
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="w-full px-3 py-2 rounded bg-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-400"
            placeholder="your@email.com"
            autoComplete="off"
            required
          />
        </div>
        <button
          type="submit"
          disabled={loading || !email}
          className="w-full bg-green-500/80 hover:bg-green-600/90 text-white px-4 py-2 rounded shadow disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {loading ? "Verifying..." : "Verify on Algorand"}
        </button>
      </form>
      {success && txId && (
        <div className="mt-4 text-green-300 text-center">
          Verified!{' '}
          <a
            href={`https://testnet.explorer.perawallet.app/tx/${txId}`}
            target="_blank"
            rel="noopener noreferrer"
            className="underline"
          >
            View on Pera Explorer
          </a>
        </div>
      )}
      {success && !txId && (
        <div className="mt-4 text-yellow-300 text-center">
          Verification succeeded, but no transaction ID was returned.
        </div>
      )}
      {error && <div className="mt-2 text-red-400 text-center">{error}</div>}
    </div>
  );
}
