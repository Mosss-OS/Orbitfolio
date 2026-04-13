import { useState, useEffect } from 'react';

const MOCK_ENS_NAMES: Record<string, string> = {
  '0xd8da6bf26964af9d7eex9e4d5491d36c5d7c917': 'vitalik.eth',
  '0x7a250d5630b4cf539739df2c5dacb4c659f2488d': 'uniswap.eth',
  '0x3c68de0d93f94b5d6b4ea17a3f3c4bc69c09c2d7': 'aave.eth',
};

const DEMO_ADDRESS = '0xd8da6bf26964af9d7eex9e4d5491d36c5d7c917';

interface ENSResult {
  name: string | null;
  loading: boolean;
  error: string | null;
}

export function useENS(address: string | null | undefined): ENSResult {
  const [result, setResult] = useState<ENSResult>({ name: null, loading: false, error: null });

  useEffect(() => {
    if (!address) {
      setResult({ name: null, loading: false, error: null });
      return;
    }

    const normalizedAddress = address.toLowerCase();
    const mockName = MOCK_ENS_NAMES[normalizedAddress];

    if (mockName) {
      setResult({ name: mockName, loading: false, error: null });
    } else {
      setResult({ name: null, loading: false, error: null });
    }
  }, [address]);

  return result;
}

export function useENSLookup() {
  const [isResolving, setIsResolving] = useState(false);

  const resolveName = async (_name: string): Promise<string | null> => {
    setIsResolving(true);
    await new Promise(resolve => setTimeout(resolve, 500));
    setIsResolving(false);
    return null;
  };

  const lookupAddress = async (_address: string): Promise<string | null> => {
    setIsResolving(true);
    await new Promise(resolve => setTimeout(resolve, 500));
    setIsResolving(false);
    return null;
  };

  return { resolveName, lookupAddress, isResolving };
}

export function formatAddress(address: string | null | undefined): string {
  if (!address) return '';
  if (address.length !== 42) return address;
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

export function formatENSName(address: string | null | undefined): string {
  const { name } = useENS(address);
  if (name) return name;
  return formatAddress(address);
}

export function useDemoAddress(): string {
  return DEMO_ADDRESS;
}

export function getDemoENSName(): string {
  return MOCK_ENS_NAMES[DEMO_ADDRESS] || formatAddress(DEMO_ADDRESS);
}