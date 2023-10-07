<div style="margin-top:20px; font-size:14px;"><strong>RECETA</strong></div>
    <div style="font-size:11px;">
        <table style="width:100%; border-collapse:collapse;">
            <thead>
                <tr>
                
                    <th style="text-align:center; border: 1px solid #bebdbd !important; border-width:1px 1px 1px 1px !important;"><strong>MEDICAMENTO</strong></th>
                    <th style="text-align:center; border: 1px solid #bebdbd !important; border-width:1px 1px 1px 1px !important;"><strong>CANT.</strong></th>
                    <th style="text-align:center; border: 1px solid #bebdbd !important; border-width:1px 1px 1px 1px !important;"><strong>UM</strong></th>
                    <th style="text-align:center; border: 1px solid #bebdbd !important; border-width:1px 1px 1px 1px !important;"><strong>FRECUENCIA</strong></th>
                    <th style="text-align:center; border: 1px solid #bebdbd !important; border-width:1px 1px 1px 1px !important;"><strong>PERIODO</strong></th>
                    <th style="text-align:center; border: 1px solid #bebdbd !important; border-width:1px 1px 1px 1px !important;"><strong>UT.</strong></th>
                </tr>
            </thead>
            <tbody>
                <?php   foreach ($atencion->receta  as $row): ?>
                <tr>
                    <td style="text-align:center; border: 1px solid #bebdbd !important; border-width:1px 1px 1px 1px !important;"><?= $row->medicamento; ?></td>
                    <td style="text-align:center; border: 1px solid #bebdbd !important; border-width:1px 1px 1px 1px !important;"><?= $row->cantidad; ?></td>
                    
                    <td style="text-align:center; border: 1px solid #bebdbd !important; border-width:1px 1px 1px 1px !important;"><?= $row->unidad_medida; ?></td> 
                    <td style="text-align:center; border: 1px solid #bebdbd !important; border-width:1px 1px 1px 1px !important;"><?= $row->frecuencia; ?></td>
                    
                    <td style="text-align:center; border: 1px solid #bebdbd !important; border-width:1px 1px 1px 1px !important;"><?= $row->periodo; ?></td>
                    <td style="text-align:center; border: 1px solid #bebdbd !important; border-width:1px 1px 1px 1px !important;"><?= $row->unidad_tiempo; ?></td>
                </tr>                    
                <?php endforeach; ?>
            </tbody>
        </table>
    </div>