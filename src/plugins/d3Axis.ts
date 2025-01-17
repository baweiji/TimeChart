import { axisBottom, axisLeft } from 'd3-axis';
import { select } from "d3-selection";
import { TimeChartPlugin } from ".";

export const d3Axis: TimeChartPlugin = {
    apply(chart) {
        const d3Svg = select(chart.svgLayer.svgNode)
        const xg = d3Svg.append('g');
        const yg = d3Svg.append('g');

        const xAxis = axisBottom(chart.model.xScale);
        const yAxis = axisLeft(chart.model.yScale);
        
        function update() {
            const xs = chart.model.xScale;
            const xts = chart.options.xScaleType()
                .domain(xs.domain().map(d => d + chart.options.baseTime))
                .range(xs.range());
            xAxis.scale(xts);
            xg.call(xAxis);

            yAxis.scale(chart.model.yScale);
            yAxis.ticks(chart.options.yTicks||10)
            yg.call(yAxis);
        }

        chart.model.updated.on(update);

        chart.model.resized.on((w, h) => {
            const op = chart.options;
            xg.attr('transform', `translate(0, ${h - op.paddingBottom})`);
            yg.attr('transform', `translate(${op.paddingLeft}, 0)`);

            update()
        });
    }
}
