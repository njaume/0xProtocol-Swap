"use client";
import FinalizedView from "../components/FinalizedView";
import Layout from "../components/Layout";
import PriceView from "../components/PriceView";
import { use0x } from "../hooks/use0x";

export default function HomePage() {
    const { state } = use0x();
    return (
        <Layout>{state.finalized ? <FinalizedView /> : <PriceView />}</Layout>
    );
}
