import React from "react";
import PageSection from "../components/PageSection";
import { getMockModelInsights } from "../services/mockApi";

export default function AnalyticsPage(){
  const [rows, setRows] = React.useState([]);
  React.useEffect(()=> setRows(getMockModelInsights()), []);

  return (
    <div className="space-y-8">
      <PageSection kicker="Analytics" title="Model & Performance Insights" subtitle="Mock insights for demo visualization.">
        <div className="overflow-auto rounded border">
          <table className="w-full text-sm">
            <thead className="bg-black/5 dark:bg-white/10">
              <tr>
                <th className="text-left p-3">Model</th>
                <th className="text-left p-3">Train Acc</th>
                <th className="text-left p-3">Val Acc</th>
                <th className="text-left p-3">Test Acc</th>
                <th className="text-left p-3">Inference (s)</th>
                <th className="text-left p-3">Params</th>
              </tr>
            </thead>
            <tbody>
              {rows.map(r=>(
                <tr key={r.model} className="border-t">
                  <td className="p-3">{r.model}</td>
                  <td className="p-3">{r.trainAccuracy}%</td>
                  <td className="p-3">{r.valAccuracy}%</td>
                  <td className="p-3">{r.testAccuracy}%</td>
                  <td className="p-3">{r.inferenceTime}</td>
                  <td className="p-3">{r.parameters}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </PageSection>
    </div>
  );
}
